//
//  MapViewController.m
//  MyLocations
//
//  Created by ZhangZehua on 2/22/17.
//  Copyright © 2017 ZhangZehua. All rights reserved.
//

#import "Location+CoreDataClass.h"
#import "MapViewController.h"
#import "GeneralFunctions.h"
#import "LocationDetailsViewController.h"

@interface MapViewController () <MKMapViewDelegate, UINavigationBarDelegate>

@property (nonatomic, weak) IBOutlet MKMapView* mapView;

@end

@implementation MapViewController {
  NSArray* _locations;
}

- (void)viewDidLoad {
    [super viewDidLoad];
  [self updateLocations];
  
  if ([_locations count] > 0) {
    [self showLocations];
  }
}

- (instancetype)initWithCoder:(NSCoder *)aDecoder {
  if ((self = [super initWithCoder:aDecoder])) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(contextDidChange:) name:NSManagedObjectContextObjectsDidChangeNotification object:self.managedObjectContext];
  }
  return self;
}

- (void)contextDidChange:(NSNotification*)notification {
  if ([self isViewLoaded]) {
    [self updateLocations];
  }
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (MKCoordinateRegion)regionForAnnotations:(NSArray*)annotations {
  MKCoordinateRegion region;
  if ([annotations count] == 0) {
    region = MKCoordinateRegionMakeWithDistance(self.mapView.userLocation.coordinate, 1000, 1000);
  } else if ([annotations count] == 1) {
    id <MKAnnotation> annotation = [annotations lastObject];
    region = MKCoordinateRegionMakeWithDistance(annotation.coordinate, 1000, 1000);
  } else {
    CLLocationCoordinate2D topLeftCoordinate;
    topLeftCoordinate.latitude = -90;
    topLeftCoordinate.longitude = 180;
    
    CLLocationCoordinate2D bottomRightCoordinate;
    bottomRightCoordinate.latitude = 90;
    bottomRightCoordinate.longitude = -180;
    
    for (id <MKAnnotation> annotation in annotations) {
      topLeftCoordinate.latitude = fmax(topLeftCoordinate.latitude, annotation.coordinate.latitude);
      topLeftCoordinate.longitude = fmin(topLeftCoordinate.longitude, annotation.coordinate.longitude);
      bottomRightCoordinate.latitude = fmin(bottomRightCoordinate.latitude, annotation.coordinate.latitude);
      bottomRightCoordinate.longitude = fmax(bottomRightCoordinate.longitude, annotation.coordinate.longitude);
    }
    const double extraSpace = 1.1;
    region.center.latitude = topLeftCoordinate.latitude - (topLeftCoordinate.latitude - bottomRightCoordinate.latitude) / 2.0;
    region.center.longitude = topLeftCoordinate.longitude - (topLeftCoordinate.longitude - bottomRightCoordinate.longitude) / 2.0;
    region.span.latitudeDelta = fabs(topLeftCoordinate.latitude - bottomRightCoordinate.latitude) * extraSpace;
    region.span.longitudeDelta = fabs(topLeftCoordinate.longitude - bottomRightCoordinate.longitude) * extraSpace;
  }
  return [self.mapView regionThatFits:region];
}

- (void)showLocationDetails:(UIButton*)button {
  [self performSegueWithIdentifier:@"EditLocation" sender:button];
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
  if ([segue.identifier isEqualToString:@"EditLocation"]) {
    UINavigationController* nvc = segue.destinationViewController;
    LocationDetailsViewController* locationDetailVC = (LocationDetailsViewController*)nvc.topViewController;
    locationDetailVC.managedObjectContext = self.managedObjectContext;
    UIButton* button = (UIButton*)sender;
    Location* location = _locations[button.tag];
    locationDetailVC.locationToEdit = location;
  }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)showUser {
  MKCoordinateRegion region = MKCoordinateRegionMakeWithDistance(self.mapView.userLocation.coordinate, 1000, 1000);
  [self.mapView setRegion:[self.mapView regionThatFits:region] animated:YES];
}

- (IBAction)showLocations {
  MKCoordinateRegion region = [self regionForAnnotations:_locations];
  [self.mapView setRegion:region animated:YES];
}

- (void)updateLocations {
  NSEntityDescription* entity = [NSEntityDescription entityForName:@"Location" inManagedObjectContext:self.managedObjectContext];
  NSFetchRequest* fetchRequest = [[NSFetchRequest alloc] init];
  [fetchRequest setEntity:entity];
  
  NSError* error;
  NSArray* foundObjects = [self.managedObjectContext executeFetchRequest:fetchRequest error:&error];
  if (foundObjects == nil) {
    [GeneralFunctions fatalCoreDataError:error];
    return;
  }
  
  if (_locations != nil) {
    [self.mapView removeAnnotations:_locations];
  }
  
  _locations = foundObjects;
  [self.mapView addAnnotation:_locations];
}

#pragma mark - MKMapViewDelegate

- (MKAnnotationView *)mapView:(MKMapView *)mapView viewForAnnotation:(id<MKAnnotation>)annotation {
  if ([annotation isKindOfClass:[Location class]]) {
    static NSString* identifier = @"Location";
    MKPinAnnotationView* annotationView = (MKPinAnnotationView*)[self.mapView dequeueReusableAnnotationViewWithIdentifier:identifier];
    if (annotationView == nil) {
      annotationView = [[MKPinAnnotationView alloc] initWithAnnotation:annotation reuseIdentifier:identifier];
      annotationView.enabled = YES;
      annotationView.canShowCallout = YES;
      annotationView.animatesDrop = NO;
      annotationView.pinTintColor = [UIColor greenColor];
      
      UIButton* rightbutton = [UIButton buttonWithType:UIButtonTypeDetailDisclosure];
      [rightbutton addTarget:self action:@selector(showLocationDetails:) forControlEvents:UIControlEventTouchUpInside];
      annotationView.rightCalloutAccessoryView = rightbutton;
    } else {
      annotationView.annotation = annotation;
    }
    UIButton* button = (UIButton*)annotationView.rightCalloutAccessoryView;
    button.tag = [_locations indexOfObject:(Location*)annotation];
    return annotationView;
  }
  return nil;
}

#pragma mark - UINavigationBarDelegate

- (UIBarPosition)positionForBar:(id<UIBarPositioning>)bar {
  return UIBarPositionTopAttached;
}

@end
