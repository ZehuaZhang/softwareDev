//
//  LocationsViewController.m
//  MyLocations
//
//  Created by ZhangZehua on 2/22/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import <CoreData/CoreData.h>
#import "LocationsViewController.h"
#import "Location+CoreDataClass.h"
#import "LocationCell.h"
#import "LocationDetailsViewController.h"
#import "GeneralFunctions.h"
#import "UIImage+Resize.h"
#import "NSMutableString+AddText.h"

@interface LocationsViewController () <NSFetchedResultsControllerDelegate>

@end

@implementation LocationsViewController {
  NSArray* _locations;
  NSFetchedResultsController* _fetchedResultsController;
}

- (NSFetchedResultsController*)fetchedResultsController {
  if (_fetchedResultsController == nil) {
    NSFetchRequest* fetchRequest = [[NSFetchRequest alloc] init];
    NSEntityDescription* enity = [NSEntityDescription entityForName:@"Location" inManagedObjectContext:self.managedObjectContext];
    [fetchRequest setEntity:enity];
    
    NSSortDescriptor* sortDescriptor1 = [NSSortDescriptor sortDescriptorWithKey:@"category" ascending:YES];
    NSSortDescriptor* sortDescriptor2 = [NSSortDescriptor sortDescriptorWithKey:@"date" ascending:YES];
    [fetchRequest setSortDescriptors:@[sortDescriptor1, sortDescriptor2]];
    [fetchRequest setFetchBatchSize:20];
    
    _fetchedResultsController = [[NSFetchedResultsController alloc] initWithFetchRequest:fetchRequest managedObjectContext:self.managedObjectContext sectionNameKeyPath:@"category" cacheName:@"Locations"];
    _fetchedResultsController.delegate = self;
  }
  return _fetchedResultsController;
}

- (void)performFetch {
  NSError* error;
  if (![[self fetchedResultsController] performFetch:&error]) {
    [GeneralFunctions fatalCoreDataError:error];
    return;
  }
}

- (void)viewDidLoad {
  [super viewDidLoad];
  [self performFetch];
  self.navigationItem.rightBarButtonItem = self.editButtonItem;
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (void)dealloc {
  _fetchedResultsController.delegate = nil;
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
  if ([segue.identifier isEqualToString:@"EditLocation"]) {
    UINavigationController* nvc = segue.destinationViewController;
    LocationDetailsViewController* locationDetailVC = (LocationDetailsViewController*)nvc.topViewController;
    locationDetailVC.managedObjectContext = self.managedObjectContext;
    NSIndexPath* indexPath = [self.tableView indexPathForCell:sender];
    Location* location = [[self fetchedResultsController] objectAtIndexPath:indexPath];
    locationDetailVC.locationToEdit = location;
  }
}

- (void)configureCell:(UITableViewCell*)cell atIndexPath:(NSIndexPath*)indexPath {
  LocationCell* locationCell = (LocationCell*)cell;
  Location* location = [[self fetchedResultsController] objectAtIndexPath:indexPath];
  
  if ([location.locationDescription length] > 0) {
    locationCell.decriptionLabel.text = location.locationDescription;
  } else {
    locationCell.decriptionLabel.text = @"(No Description)";
  }
  
  if (location.placemark != nil) {
    NSMutableString* string = [NSMutableString stringWithCapacity:100];
    [string addText:location.placemark.subThoroughfare withSeparator:@""];
    [string addText:location.placemark.thoroughfare withSeparator:@" "];
    [string addText:location.placemark.locality withSeparator:@", "];
    locationCell.addressLabel.text = string;
  } else {
    locationCell.addressLabel.text = [NSString stringWithFormat:@"Lat: %.8f, Long: %.8f", [location.latitude doubleValue], [location.longitude doubleValue]];
  }
  
  UIImage* image = nil;
  if ([location hasPhoto]) {
    image = [location photoImage];
    if (image != nil) {
      image = [image resizedImageWithBounds:CGSizeMake(52, 52)];
    }
  }
  if (image == nil) {
    image = [UIImage imageNamed:@"No Photo"];
  }
  locationCell.photoImageView.image = image;
  locationCell.photoImageView.layer.cornerRadius = locationCell.photoImageView.bounds.size.width / 2.0f;
  locationCell.photoImageView.clipsToBounds = YES;
  locationCell.separatorInset = UIEdgeInsetsMake(0, 82, 0, 0);
}

#pragma mark - Table view data source

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  id <NSFetchedResultsSectionInfo> sectionInfo = [[self fetchedResultsController] sections][section];
  return [sectionInfo numberOfObjects];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  UITableViewCell* cell = [tableView dequeueReusableCellWithIdentifier:@"Location"];
  [self configureCell:cell atIndexPath:indexPath];
  return cell;
}



- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
  if (editingStyle == UITableViewCellEditingStyleDelete) {
    Location* location = [[self fetchedResultsController] objectAtIndexPath:indexPath];
    [location removePhotoFile];
    [self.managedObjectContext deleteObject:location];
    NSError* error;
    if (![self.managedObjectContext save:&error]) {
      [GeneralFunctions fatalCoreDataError:error];
      return;
    }
  }
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  return [[[self fetchedResultsController] sections] count];
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
  id <NSFetchedResultsSectionInfo> sectionInfo = [[self fetchedResultsController] sections][section];
  return [sectionInfo name];
}

#pragma mark - NSFetchedResultsControllerDelegate

- (void)controllerWillChangeContent:(NSFetchedResultsController *)controller {
  [self.tableView beginUpdates];
}

- (void)controller:(NSFetchedResultsController *)controller didChangeObject:(id)anObject atIndexPath:(NSIndexPath *)indexPath forChangeType:(NSFetchedResultsChangeType)type newIndexPath:(NSIndexPath *)newIndexPath {
  switch (type) {
    case NSFetchedResultsChangeInsert:
      [self.tableView insertRowsAtIndexPaths:@[newIndexPath] withRowAnimation:UITableViewRowAnimationFade];
      break;
    case NSFetchedResultsChangeDelete:
      [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
      break;
    case NSFetchedResultsChangeUpdate:
      [self configureCell:[self.tableView cellForRowAtIndexPath:indexPath] atIndexPath:indexPath];
      break;
    case NSFetchedResultsChangeMove:
      [self.tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationFade];
      [self.tableView insertRowsAtIndexPaths:@[newIndexPath] withRowAnimation:UITableViewRowAnimationFade];
      break;
    default:
      break;
  }
}

- (void)controller:(NSFetchedResultsController *)controller didChangeSection:(id<NSFetchedResultsSectionInfo>)sectionInfo atIndex:(NSUInteger)sectionIndex forChangeType:(NSFetchedResultsChangeType)type {
  switch (type) {
    case NSFetchedResultsChangeInsert:
      [self.tableView insertSections:[NSIndexSet indexSetWithIndex:sectionIndex] withRowAnimation:UITableViewRowAnimationFade];
      break;
    case NSFetchedResultsChangeDelete:
      [self.tableView deleteSections:[NSIndexSet indexSetWithIndex:sectionIndex] withRowAnimation:UITableViewRowAnimationFade];
      break;
      
    default:
      break;
  }
}

- (void)controllerDidChangeContent:(NSFetchedResultsController *)controller {
  [self.tableView endUpdates];
}



@end
