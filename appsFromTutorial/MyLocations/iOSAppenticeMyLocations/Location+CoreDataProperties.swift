//
//  Location+CoreDataProperties.swift
//  MyLocations
//
//  Created by ZhangZehua on 12/7/15.
//  Copyright © 2015 ZhangZehua. All rights reserved.
//
//  Choose "Create NSManagedObject Subclass…" from the Core Data editor menu
//  to delete and recreate this implementation file for your updated model.
//

import Foundation
import CoreData
import CoreLocation
import UIKit

extension Location  {

    @NSManaged var latitude: Double
    @NSManaged var longitude: Double
    @NSManaged var date: NSDate
    @NSManaged var locationDescription: String
    @NSManaged var category: String
    @NSManaged var placemark: CLPlacemark?
    @NSManaged var photoID: NSNumber?

    var hasPhoto: Bool {
        return photoID != nil
    }
    
    var photoPath: String {
        assert(photoID != nil, "No photo ID set")
        let filename = "Photo-\(photoID!.integerValue).jpg"
        return (applicationDocumentsDirectory as NSString).stringByAppendingPathComponent(filename)
    }
    
    var photoImage: UIImage? {
        return UIImage(contentsOfFile: photoPath)
    }
    
    class func nextPhotoID() -> Int {
        let userDefaults = NSUserDefaults.standardUserDefaults()
        let currentID = userDefaults.integerForKey("PhotoID")
        userDefaults.setInteger(currentID + 1, forKey: "PhotoID")
        userDefaults.synchronize()
        return currentID
    }
    
    func removePhotoFile() {
        if hasPhoto {
            let path = photoPath
            let fileManager = NSFileManager.defaultManager()
            if fileManager.fileExistsAtPath(path) {
                do {
                    try fileManager.removeItemAtPath(path)
                } catch let error as NSError {
                    print("Error removing file: \(error)")
                }
            }
        }
    }
}
