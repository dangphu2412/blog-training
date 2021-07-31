exports.seed = knex => knex('users').insert([ // Inserts seed entries
    {
        username: 'Cuong', full_name: 'Lee ', email: 'Cuong@gmail.com', password: '$2a$10$6UR93QfWPRDjxGEpCSLMTOiEO2A8QmCl9lWxEQr7YTZ/SmqageeKa', avatar: 'https://cdn1.iconfinder.com/data/icons/avatars-vol-2/140/_killer_clown-512.png'
    },
    {
        username: 'Nhat', full_name: 'Lee ', email: 'Nhatus@gmail.com', password: '$2a$10$6UR93QfWPRDjxGEpCSLMTOiEO2A8QmCl9lWxEQr7YTZ/SmqageeKa', avatar: 'https://cdn1.iconfinder.com/data/icons/avatars-vol-2/140/_killer_clown-512.png'
    },
    {
        username: 'Hung', full_name: 'Lee ', email: 'Hung@gmail.com', password: '$2a$10$6UR93QfWPRDjxGEpCSLMTOiEO2A8QmCl9lWxEQr7YTZ/SmqageeKa', avatar: 'https://cdn1.iconfinder.com/data/icons/avatars-vol-2/140/_killer_clown-512.png'
    },
    {
        username: 'ichhoa', full_name: 'IH ', email: 'ichhoa@gmail.com', password: '$2a$10$cuWcGRN8.ecx9a1kO/wUo.H4x1tHHfM/8ZwfPR4YEik1viSqUNxGK', avatar: 'https://cdn1.iconfinder.com/data/icons/avatars-vol-2/140/_killer_clown-512.png'
    } // 123456789
]);
