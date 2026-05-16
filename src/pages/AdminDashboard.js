import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNav from "../components/DashboardNav";
import "./Dashboard.css";

const initialForm = {
    tier: "",
    apiPath: "",
    limitCount: "",
    refillRate: "",
    windowSeconds: "",
    algorithm: "TOKEN_BUCKET"
};

function AdminDashboard() {

    const [policies, setPolicies] = useState([]);

    const [editingPolicyId, setEditingPolicyId] = useState(null);

    const [form, setForm] = useState(initialForm);


    // =========================
    // LOAD POLICIES
    // =========================

    const loadPolicies = async () => {

        const response = await axios.get(
            "http://localhost:8080/admin/policies"
        );

        setPolicies(response.data);
    };


    useEffect(() => {

        loadPolicies();

    }, []);


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    // =========================
    // CREATE / UPDATE POLICY
    // =========================

    const resetForm = () => {

        setForm(initialForm);

        setEditingPolicyId(null);
    };


    const createPolicy = async () => {

        await axios.post(
            "http://localhost:8080/admin/policies",
            form
        );

        resetForm();

        loadPolicies();
    };


    const updatePolicy = async () => {

        await axios.put(
            `http://localhost:8080/admin/policies/${editingPolicyId}`,
            form
        );

        resetForm();

        loadPolicies();
    };


    const submitPolicy = async () => {

        if (editingPolicyId) {

            await updatePolicy();

            return;
        }

        await createPolicy();
    };


    const editPolicy = (policy) => {

        setEditingPolicyId(policy.id);

        setForm({
            tier: policy.tier || "",
            apiPath: policy.apiPath || "",
            limitCount: policy.limitCount || "",
            refillRate: policy.refillRate || "",
            windowSeconds: policy.windowSeconds || "",
            algorithm: policy.algorithm || "TOKEN_BUCKET"
        });
    };


    // =========================
    // DELETE POLICY
    // =========================

    const deletePolicy = async (id) => {

        await axios.delete(
            `http://localhost:8080/admin/policies/${id}`
        );

        if (editingPolicyId === id) {

            resetForm();
        }

        loadPolicies();
    };


    return (

        <div className="dashboard-container admin-dashboard">

            <DashboardNav />

            <h1>
                Admin Dashboard
            </h1>


            {/* FORM */}

            <div className="dashboard-panel admin-panel">

                <h2>
                    {editingPolicyId ? "Update Policy" : "Create Policy"}
                </h2>

                <div className="admin-form">

                    <input
                        name="tier"
                        placeholder="Tier"
                        value={form.tier}
                        onChange={handleChange}
                    />

                    <input
                        name="apiPath"
                        placeholder="API Path"
                        value={form.apiPath}
                        onChange={handleChange}
                    />

                    <input
                        name="limitCount"
                        placeholder="Limit"
                        value={form.limitCount}
                        onChange={handleChange}
                    />

                    <input
                        name="refillRate"
                        placeholder="Refill Rate"
                        value={form.refillRate}
                        onChange={handleChange}
                    />

                    <input
                        name="windowSeconds"
                        placeholder="Window Seconds"
                        value={form.windowSeconds}
                        onChange={handleChange}
                    />


                    {/* ALGORITHM */}

                    <select
                        name="algorithm"
                        value={form.algorithm}
                        onChange={handleChange}
                    >

                        <option value="TOKEN_BUCKET">
                            TOKEN_BUCKET
                        </option>

                        <option value="FIXED_WINDOW">
                            FIXED_WINDOW
                        </option>

                        <option value="SLIDING_WINDOW_LOG">
                            SLIDING_WINDOW_LOG
                        </option>

                        <option value="SLIDING_WINDOW_COUNTER">
                            SLIDING_WINDOW_COUNTER
                        </option>
                        
                        <option value="LEAKY_BUCKET">
                            LEAKY_BUCKET
                        </option>

                    </select>


                    <button
                        className="admin-primary-button"
                        onClick={submitPolicy}
                    >
                        {editingPolicyId ? "Update" : "Create"}
                    </button>

                    {
                        editingPolicyId && (

                            <button
                                className="admin-secondary-button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )
                    }

                </div>

            </div>


            {/* TABLE */}

            <div className="dashboard-panel admin-panel">

                <h2>
                    Policies
                </h2>

                <div className="admin-table-wrap">

                    <table className="admin-table">

                        <thead>

                        <tr>
                            <th>ID</th>
                            <th>Tier</th>
                            <th>API</th>
                            <th>Algorithm</th>
                            <th>Limit</th>
                            <th>Actions</th>
                        </tr>

                        </thead>

                        <tbody>

                        {
                            policies.map(policy => (

                                <tr key={policy.id}>

                                    <td>{policy.id}</td>

                                    <td>{policy.tier}</td>

                                    <td>{policy.apiPath}</td>

                                    <td>{policy.algorithm}</td>

                                    <td>{policy.limitCount}</td>

                                    <td>

                                        <div className="admin-actions">

                                            <button
                                                className="admin-secondary-button"
                                                onClick={() =>
                                                    editPolicy(policy)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="admin-danger-button"
                                                onClick={() =>
                                                    deletePolicy(policy.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))
                        }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;
