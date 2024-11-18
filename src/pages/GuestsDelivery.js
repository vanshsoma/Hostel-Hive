import React, { useState, useEffect } from 'react';

const GuestDeliveryPage = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch deliveries from the backend
    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await fetch('http://localhost:5003/api/deliveries');
                const data = await response.json();
                if (data.success) {
                    setDeliveries(data.deliveries);
                }
            } catch (error) {
                console.error('Error fetching deliveries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, []);

    // Handle delivery approval
    const handleApprove = async (deliveryId) => {
        try {
            const response = await fetch('http://localhost:5003/api/approve-delivery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ deliveryId }),
            });
            const data = await response.json();
            if (data.success) {
                setDeliveries((prev) =>
                    prev.map((delivery) =>
                        delivery.deliveryId === deliveryId
                            ? { ...delivery, status: 'Approved' }
                            : delivery
                    )
                );
                alert('Delivery approved');
            } else {
                alert('Failed to approve delivery');
            }
        } catch (error) {
            console.error('Error approving delivery:', error);
            alert('An error occurred while approving the delivery');
        }
    };

    return (
        <div className="guest-delivery-page" style={{fontFamily: 'Italiana, serif'}}>
            {loading ? (
                <p>Loading deliveries...</p>
            ) : (
                <div>
                    <h2>Delivery History</h2>
                    <table style={{fontWeight: "bold"}}>
                        <thead>
                            <tr>
                                <th>Delivery ID</th>
                                <th>Guest Name</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Items</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.map((delivery) => (
                                <tr key={delivery.deliveryId}>
                                    <td>{delivery.deliveryId}</td>
                                    <td>{delivery.guestName}</td>
                                    <td>{delivery.address}</td>
                                    <td>{delivery.status}</td>
                                    <td>
                                        <ul>
                                            {delivery.items.map((item, index) => (
                                                <li key={index}>
                                                    {item.itemName} - {item.quantity} x ${item.price}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        {delivery.status === 'Pending' && (
                                            <button onClick={() => handleApprove(delivery.deliveryId)}>
                                                Approve
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GuestDeliveryPage;
