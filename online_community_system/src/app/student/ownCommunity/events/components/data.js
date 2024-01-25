const dummyEvents = [
  {
    event_id: '1',
    community_id: 'community1',
    name: 'Event 1',
    event_time: new Date('2024-02-01T12:00:00'),
    event_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    event_image: [
      'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg&fm=jpg',
      'https://st2.depositphotos.com/1718692/7425/i/450/depositphotos_74257459-stock-photo-lake-near-the-mountain-in.jpg',
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    ],
    location: 'Nikol, Ahmedabad',
    joined_students: ['user1', 'user2', 'user3'],
    organizer: 'Organizer 1',
    max_attendees: 150,
    current_attendees: 50,
    created_at: new Date('2024-01-20T08:00:00'),
    attended: 20,
  },
  {
    event_id: '2',
    community_id: 'community2',
    name: 'Event 2',
    event_time: new Date('2024-02-15T15:30:00'),
    event_description: "Another interesting event description goes here. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    event_image: [
      'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg&fm=jpg',
      'https://st2.depositphotos.com/1718692/7425/i/450/depositphotos_74257459-stock-photo-lake-near-the-mountain-in.jpg',
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    ],
    location: 'Gandhinagar',
    joined_students: ['user4', 'user5', 'user6'],
    organizer: 'Organizer 2',
    max_attendees: 120,
    current_attendees: 80,
    created_at: new Date('2024-02-01T10:15:00'),
    attended: 30,
  },
  {
    event_id: '3',
    community_id: 'community3',
    name: 'Event 3',
    event_time: new Date('2024-03-05T18:45:00'),
    event_description: "A third event description with some interesting content. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    event_image: [
      'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-james-wheeler-414612.jpg&fm=jpg',
      'https://st2.depositphotos.com/1718692/7425/i/450/depositphotos_74257459-stock-photo-lake-near-the-mountain-in.jpg',
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    ],
    location: 'Vadodara',
    joined_students: ['user7', 'user8', 'user9'],
    organizer: 'Organizer 3',
    max_attendees: 200,
    current_attendees: 120,
    created_at: new Date('2024-02-15T12:30:00'),
    attended: 40,
  },
];

export default dummyEvents;

  