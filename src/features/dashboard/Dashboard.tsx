import { Grid, Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {
    return (
        <>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">Total Projects</Typography>
                            <Typography variant="h4" mt={2}>
                                12
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">Total Materials</Typography>
                            <Typography variant="h4" mt={2}>
                                45
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h6">Pending Requests</Typography>
                            <Typography variant="h4" mt={2}>
                                8
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;