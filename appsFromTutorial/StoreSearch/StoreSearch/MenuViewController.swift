//
//  MenuViewController.swift
//  StoreSearch
//
//  Created by ZhangZehua on 3/7/16.
//  Copyright © 2016 ZhangZehua. All rights reserved.
//

import UIKit

protocol MenuViewControllerDelegate: class {
    func menuViewControllerSendSupportEmail(_: MenuViewController)
}

class MenuViewController: UITableViewController {

    weak var delegate: MenuViewControllerDelegate?
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        tableView.deselectRowAtIndexPath(indexPath, animated: true)
        
        if indexPath.row == 0 {
            delegate?.menuViewControllerSendSupportEmail(self)
        }
    }

}
