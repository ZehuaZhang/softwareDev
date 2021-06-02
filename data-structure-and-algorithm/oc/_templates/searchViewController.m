// Search View Controller

let searchController = UISearchController(searchResultsController: nil)
searchController.searchBar.scopeButtonTitles = ["All", "Chocolate", "Hard", "Other"]
searchController.searchBar.delegate = self

searchController.searchResultsUpdater = self
searchController.dimsBackgroundDuringPresentation = false
definesPresentationContext = true
tableView.tableHeaderView = searchController.searchBar

var filteredCandies = [Candy]()

func filterContentForSearchText(searchText: String, scope: String = "All") {
  filteredCandies = candies.filter { candy in
    let categoryMatch = (scope == "All") || (candy.category == scope)
    return  categoryMatch && candy.name.lowercaseString.containsString(searchText.lowercaseString)
  }
  tableView.reloadData()
}

func updateSearchResultsForSearchController(searchController: UISearchController) {
  let searchBar = searchController.searchBar
  let scope = searchBar.scopeButtonTitles![searchBar.selectedScopeButtonIndex]
  filterContentForSearchText(searchController.searchBar.text!, scope: scope)
}

extension MasterViewController: UISearchBarDelegate {
  func searchBar(searchBar: UISearchBar, selectedScopeButtonIndexDidChange selectedScope: Int) {
    filterContentForSearchText(searchBar.text!, scope: searchBar.scopeButtonTitles![selectedScope])
  }
}

override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
  if searchController.active && searchController.searchBar.text != "" {
    return filteredCandies.count
  }
  return candies.count
}

override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
  let cell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath)
  let candy: Candy
  if searchController.active && searchController.searchBar.text != "" {
    candy = filteredCandies[indexPath.row]
  } else {
    candy = candies[indexPath.row]
  }
  cell.textLabel?.text = candy.name
  cell.detailTextLabel?.text = candy.category
  return cell
}