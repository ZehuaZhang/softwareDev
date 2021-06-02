//
//  SearchResultCell.m
//  StoreSearchOC
//
//  Created by ZhangZehua on 2/23/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "SearchResultCell.h"
#import "SearchResult.h"

@implementation SearchResultCell

- (void)awakeFromNib {
  [super awakeFromNib];
  UIView* selectedView = [[UIView alloc] initWithFrame:CGRectZero];
  selectedView.backgroundColor = [UIColor colorWithRed:20/255.0f
                                                 green:160/255.0f blue:160/255.0f alpha:0.5f];
  self.selectedBackgroundView = selectedView;
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

- (void)configureSeachResult:(SearchResult *)searchResult {
  self.nameLabel.text = searchResult.name;
  NSString* artistName = searchResult.artistName;
  if (!artistName) {
    artistName = @"Unknown";
  }
  NSString *kind = [searchResult kindForDisplay];
  self.artistNameLabel.text = [NSString stringWithFormat:@"%@ (%@)", artistName, kind];
  [self.artworkImageView setImage:[UIImage imageWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:searchResult.artworkURL60]]]];
}

- (void)prepareForReuse {
  [super prepareForReuse];
  self.nameLabel.text = nil;
  self.artistNameLabel.text = nil;
}

@end
