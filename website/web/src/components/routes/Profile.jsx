import { useAuth } from "../context/UserContext";
import { Table, Box } from "@radix-ui/themes";

const Profile = () => {
  const { user, loading } = useAuth();
  const userCurrencyHistorySorted = user?.coinsHistory
    ? [...user.coinsHistory].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];
  return (
    <>
      {loading ? (
        "Loading..."
      ) : user ? (
        <div>
          <h1>{user.username}</h1>
          <img
            src={user.profileImageUrl}
            alt="avatar"
            style={{ height: "100px", borderRadius: "50%" }}
          />
          <p>Currency: {user.coins}</p>
          <p>Watch Time: {user.watchTime} minutes</p>
          <p>Subscriber: {user.isSubscriber ? "Yes" : "No"}</p>
          <p>
            Following Since:{" "}
            {user.followingSince
              ? new Date(user.followingSince).toLocaleString()
              : "Not following"}
          </p>
          <Box width="30%">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Reason</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {userCurrencyHistorySorted.map((entry, index) => (
                  <Table.Row key={index}>
                    <Table.RowHeaderCell>{entry.reason}</Table.RowHeaderCell>
                    <Table.Cell>{entry.amount}</Table.Cell>
                    <Table.Cell>
                      {new Date(entry.date).toLocaleString()}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </div>
      ) : (
        "No user data available."
      )}
    </>
  );
};
export default Profile;
