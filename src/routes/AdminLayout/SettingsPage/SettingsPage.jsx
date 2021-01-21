import React from 'react';
import Grid from '@material-ui/core/Grid';

class SettingsPage extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            Test
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            Test2
          </Grid>
        </Grid>
      </div>
    );
  }
}

export { SettingsPage };
