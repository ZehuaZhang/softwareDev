//
//  SearchResultCell.h
//  StoreSearchOC
//
//  Created by ZhangZehua on 2/23/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <UIKit/UIKit.h>

@class SearchResult;

@interface SearchResultCell : UITableViewCell

@property (weak, nonatomic) IBOutlet UILabel* nameLabel;
@property (weak, nonatomic) IBOutlet UILabel* artistNameLabel;
@property (weak, nonatomic) IBOutlet UIImageView* artworkImageView;

- (void)configureSeachResult:(SearchResult*)searchResult;

@end
