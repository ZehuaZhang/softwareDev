// Scroll View Controller

extension ZoomedPhotoViewController: UIScrollViewDelegate {
  func viewForZoomingInScrollView(scrollView: UIScrollView) -> UIView? {
    return imageView
  }
}

private func updateMinZoomScaleForSize(size: CGSize) {
  let widthScale = size.width / imageView.bounds.width
  let heightScale = size.height / imageView.bounds.height
  let minScale = min(widthScale, heightScale)  
  
  scrollView.minimumZoomScale = minScale 
  
  scrollView.zoomScale = minScale
}

override func viewDidLayoutSubviews() {
  super.viewDidLayoutSubviews()

  updateMinZoomScaleForSize(view.bounds.size)
}

//// Center
private func updateConstraintsForSize(size: CGSize) {   

  let yOffset = max(0, (size.height - imageView.frame.height) / 2) 
  imageViewTopConstraint.constant = yOffset
  imageViewBottomConstraint.constant = yOffset

  let xOffset = max(0, (size.width - imageView.frame.width) / 2)
  imageViewLeadingConstraint.constant = xOffset
  imageViewTrailingConstraint.constant = xOffset

  view.layoutIfNeeded()
}

func scrollViewDidZoom(scrollView: UIScrollView) {
  updateConstraintsForSize(view.bounds.size) 
}

// handling keyboard
NSNotificationCenter.defaultCenter().addObserver(
  self,
  selector: #selector(PhotoCommentViewController.keyboardWillShow(_:)),
  name: UIKeyboardWillShowNotification,
  object: nil
)

NSNotificationCenter.defaultCenter().addObserver(
  self,
  selector: #selector(PhotoCommentViewController.keyboardWillHide(_:)),
  name: UIKeyboardWillHideNotification,
  object: nil
)

deinit {
  NSNotificationCenter.defaultCenter().removeObserver(self)
}

func adjustInsetForKeyboardShow(show: Bool, notification: NSNotification) {
  guard let value = notification.userInfo?[UIKeyboardFrameBeginUserInfoKey] as? NSValue else { return }
  let keyboardFrame = value.CGRectValue()
  let adjustmentHeight = (CGRectGetHeight(keyboardFrame) + 20) * (show ? 1 : -1)
  scrollView.contentInset.bottom += adjustmentHeight
  scrollView.scrollIndicatorInsets.bottom += adjustmentHeight
}

func keyboardWillShow(notification: NSNotification) {
  adjustInsetForKeyboardShow(true, notification: notification)
}
  
func keyboardWillHide(notification: NSNotification) {
  adjustInsetForKeyboardShow(false, notification: notification)
}

// page view controller
class ManagePageViewController: UIPageViewController {
  var photos = ["photo1", "photo2", "photo3", "photo4", "photo5"]
  var currentIndex: Int!

  override func viewDidLoad() {
    super.viewDidLoad()

    dataSource = self

    // 1
    if let viewController = viewPhotoCommentController(currentIndex ?? 0) {
      let viewControllers = [viewController]
      // 2
      setViewControllers(
        viewControllers,
        direction: .Forward,
        animated: false,
        completion: nil
      )
    }
  }

  func viewPhotoCommentController(index: Int) -> PhotoCommentViewController? {
    if let storyboard = storyboard,
        page = storyboard.instantiateViewControllerWithIdentifier("PhotoCommentViewController") 
        as? PhotoCommentViewController {
      page.photoName = photos[index]
      page.photoIndex = index
      return page
    }
    return nil
  }
}

extension ManagePageViewController: UIPageViewControllerDataSource {
  // 1
  func pageViewController(pageViewController: UIPageViewController,
      viewControllerBeforeViewController viewController: UIViewController) -> UIViewController? {
      
    if let viewController = viewController as? PhotoCommentViewController {
      var index = viewController.photoIndex
      guard index != NSNotFound && index != 0 else { return nil }
      index = index - 1
      return viewPhotoCommentController(index)
    }
    return nil
  }
  
  // 2
  func pageViewController(pageViewController: UIPageViewController,
      viewControllerAfterViewController viewController: UIViewController) -> UIViewController? {

    if let viewController = viewController as? PhotoCommentViewController {
      var index = viewController.photoIndex
      guard index != NSNotFound else { return nil }
      index = index + 1
      guard index != photos.count else {return nil}
      return viewPhotoCommentController(index)
    }
    return nil
  }
}

override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
  if let cell = sender as? UICollectionViewCell, 
      indexPath = collectionView?.indexPathForCell(cell), 
      managePageViewController = segue.destinationViewController as? ManagePageViewController {
    managePageViewController.photos = photos
    managePageViewController.currentIndex = indexPath.row
  }
}

//// page control
func presentationCountForPageViewController(pageViewController: UIPageViewController) -> Int {
  return photos.count
}
  
func presentationIndexForPageViewController(pageViewController: UIPageViewController) -> Int {
  return currentIndex ?? 0
}