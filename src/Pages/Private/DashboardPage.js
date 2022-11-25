import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MyOrders from '../../components/Dashboard/MyOrders';
import { AuthUser } from '../../Context/AuthContext';

const DashboardPage = () => {
    return (
        <section className={``}>
            <div className={`grid grid-cols-3`}>
                <div className={`col-span-4 my-5`}>
                    <MyOrders></MyOrders>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;