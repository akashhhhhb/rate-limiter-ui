function TopApis({ apiHits }) {

    return (

        <div className="dashboard-panel">

            <h2>Top APIs</h2>

            <div className="dashboard-list">

                {

                    Object.entries(apiHits)
                        .map(([api, count]) => (

                            <div
                                key={api}
                                className="dashboard-list-item"
                            >

                                <strong>{api}</strong>

                                <div>{count} requests</div>

                            </div>
                        ))
                }

            </div>

        </div>
    );
}

export default TopApis;
