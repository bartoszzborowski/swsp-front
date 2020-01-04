import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import HorizontalTabs from 'routes/AdminLayout/components/HorizontalTabs';

class StudentDetails extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <CardHeader
                title={'Szczególy ucznia'}
                subheader={
                  "Enter your school's details. This information will appear on reports, emails and receipts."
                }
              />
              <CardContent>
                <HorizontalTabs
                  tabsLabel={['Profil', 'Egzaminy', 'Dokumenty', 'Timeline']}
                >
                  <div>Div1</div>
                  <div>div2</div>
                  <div>div3</div>
                  <div>div4</div>
                </HorizontalTabs>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export { StudentDetails };
