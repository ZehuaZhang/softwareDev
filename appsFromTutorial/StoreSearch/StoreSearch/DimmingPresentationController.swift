//
//  DimmingPresentationController.swift
//  StoreSearch
//
//  Created by ZhangZehua on 1/11/16.
//  Copyright © 2016 ZhangZehua. All rights reserved.
//

import UIKit

class DimmingPresentationController: UIPresentationController {
    override func shouldRemovePresentersView() -> Bool {
        return false
    }
}
