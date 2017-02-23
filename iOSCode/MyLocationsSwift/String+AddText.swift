//
//  String+AddText.swift
//  MyLocations
//
//  Created by ZhangZehua on 12/10/15.
//  Copyright © 2015 ZhangZehua. All rights reserved.
//

//import Foundation
extension String {
    mutating func addText(text: String?, withSeparator separator: String = "") {
        if let text = text {
            if !isEmpty {
                self += separator
            }
            self += text
        }
    }
}
