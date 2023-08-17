
using bank_backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Text.Json;

namespace bank_backend.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserService(IOptions<BankDatabaseSettings> bankDatabaseSettings)
        {
            var client = new MongoClient(bankDatabaseSettings.Value.ConnectionString);
            var database = client.GetDatabase(bankDatabaseSettings.Value.DatabaseName);

            _usersCollection = database.GetCollection<User>(bankDatabaseSettings.Value.UsersCollectionName);

            _usersCollection.DeleteMany(Builders<User>.Filter.Empty);
            StreamReader r = new StreamReader("./tests/data.json");
            string jsonString = r.ReadToEnd();
           
            List<User> users = JsonSerializer.Deserialize<List<User>>(jsonString);
            _usersCollection.InsertMany(users);
    
        }

         public async Task<List<User>> GetAsync() =>
        await _usersCollection.Find(_ => true).ToListAsync();

        public async Task<User?> GetAsync(string id) =>
            await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(User newUser)
        {
            newUser.account.routing = Account.SelectRouting();
            int count = (int)await _usersCollection.CountDocumentsAsync(Builders<User>.Filter.Empty);
            int id = 111111111 + count;
            newUser.account.id = id.ToString();
            await _usersCollection.InsertOneAsync(newUser);
        }

        public async Task UpdateAsync(string id, User updatedUser) =>
            await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

        public async Task RemoveAsync(string id) =>
            await _usersCollection.DeleteOneAsync(x => x.Id == id);

        public async Task ResetAsync() =>
            await _usersCollection.DeleteManyAsync(Builders<User>.Filter.Empty);

    }
}

