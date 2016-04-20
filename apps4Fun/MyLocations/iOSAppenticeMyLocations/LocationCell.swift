//
//  LocationCell.swift
//  MyLocations
//
//  Created by ZhangZehua on 12/8/15.
//  Copyright © 2015 ZhangZehua. All rights reserved.
//

import UIKit

class LocationCell: UITableViewCell {

    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var addressLabel: UILabel!
    @IBOutlet weak var photoImageView: UIImageView!

    // MARK:- view
    override func awakeFromNib() {
        super.awakeFromNib()
        
        let AsparagusColor = UIColor(red: 112/255.0, green: 187/255.0, blue: 86/255.0, alpha: 1.0)
        backgroundColor = AsparagusColor
        descriptionLabel.textColor = UIColor.whiteColor()
        descriptionLabel.highlightedTextColor = descriptionLabel.textColor
        addressLabel.textColor = UIColor(white: 1.0, alpha: 0.4)
        addressLabel.highlightedTextColor = addressLabel.textColor
        
        let selectionView = UIView(frame: CGRect.zero)
        selectionView.backgroundColor = UIColor(white: 1.0, alpha: 0.2)
        selectedBackgroundView = selectionView
        
        photoImageView.layer.cornerRadius = photoImageView.bounds.size.width / 2
        photoImageView.clipsToBounds = true
        separatorInset = UIEdgeInsets(top: 0, left: 82, bottom: 0, right: 0)
        
//        descriptionLabel.backgroundColor = UIColor.blueColor()
//        addressLabel.backgroundColor = UIColor.redColor()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        if let sv = superview {
            descriptionLabel.frame.size.width = sv.frame.size.width - descriptionLabel.frame.origin.x - 10
            addressLabel.frame.size.width = sv.frame.size.width - addressLabel.frame.origin.x - 10
        }
    }
    
    // MARK: - misc
    func configureForLocation(location: Location) {
        if location.locationDescription.isEmpty {
            descriptionLabel.text = "(No Description)"
        } else {
            descriptionLabel.text = location.locationDescription
        }
        
        addressLabel.text = addressFromLocation(location)
        photoImageView.image = imageForLocation(location)
    }
    
    
    func addressFromLocation(location: Location) -> String {
        var addressLine = ""
        
        if let placemark = location.placemark {
            
            addressLine.addText(placemark.subThoroughfare)
            addressLine.addText(placemark.thoroughfare, withSeparator: " ")
            addressLine.addText(placemark.locality, withSeparator: ", ")
        } else {
            addressLine = String(format: "Latitude: %.4f, Longitude: %.4f", location.latitude, location.longitude)
        }
        
        return addressLine
    }
    
    func imageForLocation(location: Location) -> UIImage {
        if location.hasPhoto {
            if let image = location.photoImage {
                return image.resizedImageWithBounds(CGSize(width: 52, height: 52))
            }
        }
        return UIImage(named: "No Photo")!
    }
}
