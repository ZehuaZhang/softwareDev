//
//  Location.swift
//  MyLocations
//
//  Created by ZhangZehua on 12/7/15.
//  Copyright © 2015 ZhangZehua. All rights reserved.
//

import Foundation
import CoreData
import MapKit

class Location: NSManagedObject{

// Insert code here to add functionality to your managed object subclass
    
}

extension Location: MKAnnotation {
    
    var coordinate: CLLocationCoordinate2D {
        return CLLocationCoordinate2DMake(latitude, longitude)
    }
    
    var title: String? {
        if locationDescription.isEmpty {
            return "(No Description)"
        } else {
            return locationDescription
        }
    }
    
    var subtitle: String? {
        return category
    }
}