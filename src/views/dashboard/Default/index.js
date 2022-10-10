import React, { useEffect, useState, Component } from 'react';
import loginUser from '../../../data/login';
import SubCard from 'ui-component/cards/SubCard';
import Tabla from './Tabla';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { Redirect } from 'react-router-dom';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [datos, setDatos] = React.useState([]);

    useEffect(() => {
        setLoading(false);
        localStorage.getItem('userLogin');
        localStorage.getItem('typeUser');
    }, []);

    return (
        <Grid citem xs={12} sm={12} sx={{ px: 2, pb: 2 }}>
            <SubCard title="Clases del día">
                <Grid container direction="column" spacing={1}>
                    Lista de las clases impartidas por los profesores del dia actual
                </Grid>
            </SubCard>
        </Grid>
    );
};

export default Dashboard;
