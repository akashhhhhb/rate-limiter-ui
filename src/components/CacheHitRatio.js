function CacheHitRatio({
    hits,
    misses
}) {

    const total = hits + misses;

    const ratio =
        total === 0
            ? 0
            : ((hits / total) * 100)
                .toFixed(2);

    return (

        <div className="dashboard-panel cache-hit-ratio">

            <h2>
                Cache Hit Ratio
            </h2>

            <h1 className="cache-hit-ratio-value">
                {ratio}%
            </h1>

            <div className="cache-hit-ratio-track">

                <div
                    className="cache-hit-ratio-fill"
                    style={{
                        width: `${ratio}%`
                    }}
                />

            </div>

        </div>
    );
}

export default CacheHitRatio;
