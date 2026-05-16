function TopUsers({ userHits }) {

    return (

        <div className="dashboard-panel">

            <h2>Top Users</h2>

            <div className="dashboard-list">

                {

                    Object.entries(userHits)
                        .map(([user, count]) => (

                            <div
                                key={user}
                                className="dashboard-list-item"
                            >

                                <strong>{user}</strong>

                                <div>{count} requests</div>

                            </div>
                        ))
                }

            </div>

        </div>
    );
}

export default TopUsers;
