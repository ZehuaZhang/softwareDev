//
//  AppDelegate.swift
//  iOSAppenticeMyLocations
//
//  Created by ZhangZehua on 11/30/15.
//  Copyright © 2015 ZhangZehua. All rights reserved.
//

import UIKit
import CoreData

// MARK: - global property

let ManagedObjectContextSaveDidFailNotification = "ManagedObjectContextSaveDidFailNotification"

// MARK: - global functions

func fatalCoreDataError(error: NSError?) {
    if let error = error {
        print("*** Fatal error: \(error), \(error.userInfo)")
    }
    NSNotificationCenter.defaultCenter().postNotificationName(ManagedObjectContextSaveDidFailNotification, object: error)
}

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    // MARK:- property
    var window: UIWindow?

    lazy var managedObjectContext: NSManagedObjectContext = {
        if let modelURL = NSBundle.mainBundle().URLForResource("DataModel", withExtension: "momd") {
            if let model = NSManagedObjectModel(contentsOfURL: modelURL) {
                let coordinater = NSPersistentStoreCoordinator(managedObjectModel: model)
                
                let urls = NSFileManager.defaultManager().URLsForDirectory(.DocumentDirectory, inDomains: .UserDomainMask)
                let documentsDirectory = urls[0] as NSURL
                let storeURL = documentsDirectory.URLByAppendingPathComponent("DataStore.sqlite")
                print(documentsDirectory)
                
                do {
                    let store = try coordinater.addPersistentStoreWithType(NSSQLiteStoreType, configuration: nil, URL: storeURL, options: nil)
                    
                    let context = NSManagedObjectContext(concurrencyType: .MainQueueConcurrencyType)
                    context.persistentStoreCoordinator = coordinater
                    
                    return context
                    
                } catch let error as NSError {
                    print("Error adding persistent store at \(storeURL): \(error)")
                }
            } else {
                print("Error initializing model from: \(modelURL)")
            }
        } else {
            print("Could not find data model in app bundle")
        }
        
        abort()
    }()
    
    // MARK:- functions
    // MARK:- misc
    func listenForFatalCoreDataNotifications() {
        NSNotificationCenter.defaultCenter().addObserverForName(ManagedObjectContextSaveDidFailNotification, object: nil, queue: NSOperationQueue.mainQueue(), usingBlock: {
            notification in
            let alert = UIAlertController(
                title: "Internal Error",
                message: "There was a fatal error in the app and it cannot continue.\n\n"
                        + "Press OK to terminate the app. Sorry for the inconvenience.",
                preferredStyle: .Alert)
            let action = UIAlertAction(title: "OK", style: .Default) {
                _ in
                let exception = NSException(name: NSInternalInconsistencyException,
                    reason: "Fatal CoreData error",
                    userInfo: nil)
                exception.raise()
            }
            alert.addAction(action)
        
            self.viewControllerForShowingAlert().presentViewController(alert, animated: true, completion: nil)
        })
    }
    
    func viewControllerForShowingAlert() -> UIViewController {
        let rootViewController = window!.rootViewController!
        if let presentedViewController = rootViewController.presentedViewController {
            return presentedViewController
        } else {
            return rootViewController
        }
    }
    
    func customizeAppearance() {
        let AsparagusColor = UIColor(red: 112/255.0, green: 187/255.0, blue: 86/255.0, alpha: 1.0)
        
        UINavigationBar.appearance().barTintColor = AsparagusColor
        UINavigationBar.appearance().titleTextAttributes = [NSForegroundColorAttributeName: UIColor.whiteColor()]
        
        UITabBar.appearance().barTintColor = AsparagusColor
        let tintColor = UIColor(red: 255/255.0, green: 238/255.0, blue: 136/255.0, alpha: 1.0)
        UITabBar.appearance().tintColor = tintColor
    }
    
    // MARK:- Appdelegate
    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        // Override point for customization after application launch.
        
        customizeAppearance()
        
        let tabBarController = window!.rootViewController as! UITabBarController
        
        if let tabBarViewControllers = tabBarController.viewControllers {
            //currentLocationsViewController
            let currentLocationViewController = tabBarViewControllers[0] as! CurrentLocationViewController
            currentLocationViewController.managedObjectContext = managedObjectContext
            //locationsViewController
            let navigationControoler = tabBarViewControllers[1] as! UINavigationController
            let locationsViewController = navigationControoler.viewControllers[0] as! LocationsViewController
            
            locationsViewController.managedObjectContext = managedObjectContext
            let _ = locationsViewController.view
            //mapViewController
            let mapViewController = tabBarViewControllers[2] as! MapViewController
            mapViewController.managedObjectContext = managedObjectContext
        }
        
        listenForFatalCoreDataNotifications()
        return true
    }

    func applicationWillResignActive(application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(application: UIApplication) {
        // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }


}

