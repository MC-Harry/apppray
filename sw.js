// AppPray — Service Worker pour les notifications push

self.addEventListener('push', function(event) {
  var data = {};
  try { data = event.data ? event.data.json() : {}; } catch(e) { data = { title: 'AppPray', body: event.data ? event.data.text() : '' }; }
  var title = data.title || 'AppPray 🙏';
  var options = {
    body: data.body || '',
    icon: 'https://apppray.vercel.app/icon-192.png',
    badge: 'https://apppray.vercel.app/icon-192.png',
    data: { url: data.url || 'https://apppray.vercel.app' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || 'https://apppray.vercel.app';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        if (clientList[i].url === url && 'focus' in clientList[i]) return clientList[i].focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
