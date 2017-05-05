// Table view

self.tableView.backgroundColor = [UIColor blackColor];
self.tableView.separatorColor = [UIColor colorWithWhite:1.0f alpha:0.2f];

UIView *selectionView = [[UIView alloc] initWithFrame:CGRectZero];
selectionView.backgroundColor = [UIColor colorWithWhite:1.0f alpha:0.2f];
cell.selectedBackgroundView = selectionView;

//// swipe to delete
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
  [self.checklist.items removeObjectAtIndex:indexPath.row];

  [tableView deleteRowsAtIndexPaths:@[indexPath] withRowAnimation:UITableViewRowAnimationAutomatic];
}

//// unable gray color of selected cell
cell.selectionStyle = UITableViewCellSelectionStyleNone;

- (NSIndexPath *)tableView:(UITableView *)tableView willSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  return nil;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  [self.tableView deselectRowAtIndexPath:indexPath animated:YES];
}

//// segue for edit
- (void)tableView:(UITableView *)tableView accessoryButtonTappedForRowWithIndexPath:(NSIndexPath *)indexPath {
  UINavigationController *navigationController = [self.storyboard instantiateViewControllerWithIdentifier:@"ListNavigationController"];

  ListDetailViewController *controller = (ListDetailViewController *)navigationController.topViewController;
  controller.delegate = self;

  Checklist *checklist = self.dataModel.lists[indexPath.row];
  controller.checklistToEdit = checklist;

  [self presentViewController:navigationController animated:YES completion:nil];
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
  UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(15.0f, tableView.sectionHeaderHeight - 14.0f, 300.0f, 14.0f)];
  label.font = [UIFont boldSystemFontOfSize:11.0f];
  label.text = [tableView.dataSource tableView:tableView titleForHeaderInSection:section];
  label.textColor = [UIColor colorWithWhite:1.0f alpha:0.4f];
  label.backgroundColor = [UIColor clearColor];

  UIView *separator = [[UIView alloc] initWithFrame:CGRectMake(15.0f, tableView.sectionHeaderHeight - 0.5f, tableView.bounds.size.width - 15.0f, 0.5f)];
  separator.backgroundColor = tableView.separatorColor;

  UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0.0f, 0.0f, tableView.bounds.size.width, tableView.sectionHeaderHeight)];
  view.backgroundColor = [UIColor colorWithWhite:0.0f alpha:0.85f];
  [view addSubview:label];
  [view addSubview:separator];

  return view;
}

//// self-made view with search bar

self.tableView.contentInset = UIEdgeInsetsMake(108, 0, 0, 0);
self.tableView.rowHeight = 80;

UINib *cellNib = [UINib nibWithNibName:SearchResultCellIdentifier bundle:nil];
[self.tableView registerNib:cellNib forCellReuseIdentifier:SearchResultCellIdentifier];

cellNib = [UINib nibWithNibName:NothingFoundCellIdentifier bundle:nil];
[self.tableView registerNib:cellNib forCellReuseIdentifier:NothingFoundCellIdentifier];

cellNib = [UINib nibWithNibName:LoadingCellIdentifier bundle:nil];
[self.tableView registerNib:cellNib forCellReuseIdentifier:LoadingCellIdentifier];

//// Idiom

- (void)willRotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation duration:(NSTimeInterval)duration {
  [super willRotateToInterfaceOrientation:toInterfaceOrientation duration:duration];

  if (UI_USER_INTERFACE_IDIOM() != UIUserInterfaceIdiomPad) {
    if (UIInterfaceOrientationIsPortrait(toInterfaceOrientation)) {
      [self hideLandscapeViewWithDuration:duration];
    } else {
      [self showLandscapeViewWithDuration:duration];
    }
  }
}

