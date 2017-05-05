// Delay

[self performSelector:@selector(didTimeOut:) withObject:nil afterDelay:60];

[NSObject cancelPreviousPerformRequestsWithTarget:self selector:@selector(didTimeOut:) object:nil];