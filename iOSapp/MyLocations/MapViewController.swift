//
//  MapViewController.swift
//  MyLocations
//
//  Created by ZhangZehua on 12/9/15.
//  Copyright © 2015 ZhangZehua. All rights reserved.
//

import UIKit
import MapKit
import CoreData

class MapViewController: UIViewController {
    
    //MARK:- IBOutlet
    @IBOutlet weak var mapView: MKMapView!
    
    //MARK:- property
    var managedObjectContext: NSManagedObjectContext! {
        didSet {
            NSNotificationCenter.defaultCenter().addObserverForName(
                NSManagedObjectContextObjectsDidChangeNotification,
                object: managedObjectContext,
                queue: NSOperationQueue.mainQueue()) {
                    notification in
                    if self.isViewLoaded() {
                        self.updateLocations()
                    }
//                    if let dictionary = notification.userInfo {
//                        print(dictionary["inserted"])
//                        print(dictionary["deleted"])
//                        print(dictionary["updated"])
//                    }
            }
        }
    }
    var locations = [Location]()
    
    //MARK:- IBAction
    @IBAction func showUser() {
        let region = MKCoordinateRegionMakeWithDistance(mapView.userLocation.coordinate, 1000, 1000)
        mapView.setRegion(mapView.regionThatFits(region), animated: true)
    }
    
    @IBAction func showLocations() {
        let region = regionForAnnotations(locations)
        mapView.setRegion(region, animated: true)
    }
    
    //MARK:- view
    override func viewDidLoad() {
        super.viewDidLoad()

        updateLocations()
        
       if !locations.isEmpty {
            showLocations()
       }
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "EditLocation" {
            let navigationController = segue.destinationViewController as! UINavigationController
            let controller = navigationController.topViewController as! LocationDetailsViewController
            
            controller.managedObjectContext = managedObjectContext
            
            let button = sender as! UIButton
            let location = locations[button.tag]
            controller.locationToEdit = location
        }
    }
    
    //MARK:- misc
    func updateLocations() {
        let entity = NSEntityDescription.entityForName("Location", inManagedObjectContext: managedObjectContext)
        let fetchRequest = NSFetchRequest()
        fetchRequest.entity = entity
        
        var foundObject: [AnyObject];
        
        do {
            foundObject = try managedObjectContext.executeFetchRequest(fetchRequest)
            
        } catch let error as NSError {
            fatalCoreDataError(error)
            return
        }
        
        mapView.removeAnnotations(locations)
        locations = foundObject as! [Location]
        mapView.addAnnotations(locations)
    }
    
    func regionForAnnotations(annotations: [MKAnnotation]) -> MKCoordinateRegion {
        var region: MKCoordinateRegion
        
        switch annotations.count {
        case 0:
            region = MKCoordinateRegionMakeWithDistance(mapView.userLocation.coordinate, 1000, 1000)
            
        case 1:
            let annotation = annotations[annotations.count - 1]
            region = MKCoordinateRegionMakeWithDistance(annotation.coordinate, 1000, 1000)
        default:
            var topLeftCoord = CLLocationCoordinate2D(latitude: -90, longitude: 180)
            var bottomRightCoord = CLLocationCoordinate2D(latitude: 90, longitude: -180)
            
            for annotation in annotations {
                topLeftCoord.latitude = max(topLeftCoord.latitude, annotation.coordinate.latitude)
                topLeftCoord.longitude = min(topLeftCoord.longitude, annotation.coordinate.longitude)
                bottomRightCoord.latitude = min(bottomRightCoord.latitude, annotation.coordinate.latitude)
                bottomRightCoord.longitude = max(bottomRightCoord.longitude, annotation.coordinate.longitude)
            }
            
            let center = CLLocationCoordinate2D(
                latitude: (topLeftCoord.latitude + bottomRightCoord.latitude) / 2,
                longitude: (topLeftCoord.longitude + bottomRightCoord.longitude) / 2)
            
            let extraSpace = 1.1
            let span = MKCoordinateSpan(
                latitudeDelta: abs(topLeftCoord.latitude - bottomRightCoord.latitude) * extraSpace,
                longitudeDelta: abs(topLeftCoord.longitude - bottomRightCoord.longitude) * extraSpace)
            
            region = MKCoordinateRegion(center: center, span: span)
        }
        return mapView.regionThatFits(region)
    }
    
    func showLocationDetails(sender: UIButton) {
        performSegueWithIdentifier("EditLocation", sender: sender)
    }
}

extension MapViewController: MKMapViewDelegate {
    func mapView(mapView: MKMapView, viewForAnnotation annotation: MKAnnotation) -> MKAnnotationView? {
        if annotation is Location {
            let identifier = "Location"
            var annotationView = mapView.dequeueReusableAnnotationViewWithIdentifier(identifier) as! MKPinAnnotationView!
            
            if annotationView == nil {
                annotationView = MKPinAnnotationView(annotation: annotation, reuseIdentifier: identifier)
                
                annotationView.enabled = true
                annotationView.canShowCallout = true
                annotationView.animatesDrop = false
                annotationView.pinTintColor = UIColor.greenColor()
                annotationView.tintColor = UIColor(white: 0, alpha: 0.5)
                
                let rightButton = UIButton(type: .DetailDisclosure)
                rightButton.addTarget(
                    self,
                    action: Selector("showLocationDetails:"),
                    forControlEvents: .TouchUpInside)
                annotationView.rightCalloutAccessoryView = rightButton
            } else {
                annotationView.annotation = annotation
            }
            
            let button = annotationView.rightCalloutAccessoryView as! UIButton
            if let index = locations.indexOf(annotation as! Location) {
                button.tag = index
            }
            
            return annotationView
        }
        return nil
    }
}

extension MapViewController: UINavigationBarDelegate {
    func positionForBar(bar: UIBarPositioning) -> UIBarPosition {
        return .TopAttached
    }
}
