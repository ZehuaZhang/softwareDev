//
//  File.swift
//  iOSAppenticeMyLocations
//
//  Created by ZhangZehua on 12/6/15.
//  Copyright © 2015 ZhangZehua. All rights reserved.
//

import UIKit

class CategoryPickerViewController: UITableViewController {
    
    // MARK: - Property
    
    var selectedCategoryName = ""
    
    let categories = [
        "No Category",
        "Apple Store",
        "Bar",
        "Bookstore",
        "Club",
        "Grocery Store",
        "Historic Building",
        "House",
        "Icecream Vendor",
        "Landmark",
        "Park"
    ]
    
    var selectedIndexPath = NSIndexPath()
    
    // MARK: - view
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let AsparagusColor = UIColor(red: 112/255.0, green: 187/255.0, blue: 86/255.0, alpha: 1.0)
        tableView.backgroundColor = AsparagusColor
        tableView.separatorColor = UIColor(white: 1.0, alpha: 0.2)
        tableView.indicatorStyle = .White
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "PickedCategory" {
            let cell = sender as! UITableViewCell
            if let indexPath = tableView.indexPathForCell(cell) {
                selectedCategoryName = categories[indexPath.row]
            }
        }
    }
    
    // MARK: - UITableViewDataSource
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return categories.count
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell")
        
        let categoryName = categories[indexPath.row]
        cell?.textLabel!.text = categoryName
        
        if categoryName == selectedCategoryName {
            cell?.accessoryType = .Checkmark
            selectedIndexPath = indexPath
        } else {
            cell?.accessoryType = .None
        }
        
        return cell!
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        if indexPath.row != selectedIndexPath.row {
            if let newCell = tableView.cellForRowAtIndexPath(indexPath) {
                newCell.accessoryType = .Checkmark
            }
            
            if let oldCell = tableView.cellForRowAtIndexPath(selectedIndexPath) {
                oldCell.accessoryType = .None
            }
            selectedIndexPath = indexPath
        }
    }
    
    override func tableView(tableView: UITableView, willDisplayCell cell: UITableViewCell, forRowAtIndexPath indexPath: NSIndexPath) {
        let AsparagusColor = UIColor(red: 112/255.0, green: 187/255.0, blue: 86/255.0, alpha: 1.0)
        cell.backgroundColor = AsparagusColor
        
        if let textLabel = cell.textLabel {
            textLabel.textColor = UIColor.whiteColor()
            textLabel.highlightedTextColor = textLabel.textColor
        }
        let selectionView = UIView(frame: CGRect.zero)
        selectionView.backgroundColor = UIColor(white: 1.0, alpha: 0.2)
        cell.selectedBackgroundView = selectionView
    }
}
