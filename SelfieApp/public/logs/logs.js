getData();

async function getData() {
  /// from client lets make GET request to a route on server have route return data from db using fetch()
  const response = await fetch('/oracle');
  const data = await response.json();
  //creating DOM Elements
  // handling objects with for loop

  for (item of data) {
    const root = document.createElement('p');
    const mood = document.createElement('div');
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');

    mood.textContent = `mood: ${item.mood}`;
    geo.textContent = `${item.lat}°, ${item.lon}°`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    image.src = item.image64;
    // lets client see whats going on .alt
    image.alt = 'john making silly faces.';

    root.append(mood, geo, date, image);
    document.body.append(root);
  }
  console.log(data);
}