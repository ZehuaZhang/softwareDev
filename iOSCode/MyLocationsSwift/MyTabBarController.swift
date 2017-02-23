//
//  MyTabBarController.swift
//  MyLocations
//
//  Created by ZhangZehua on 12/11/15.
//  Copyright © 2015 ZhangZehua. All rights reserved.
//

import UIKit

class MyTabBarController: UITabBarController {
    override func preferredStatusBarStyle() -> UIStatusBarStyle {
        return .LightContent
    }
    
    override func childViewControllerForStatusBarStyle() -> UIViewController? {
        return nil
    }
}
