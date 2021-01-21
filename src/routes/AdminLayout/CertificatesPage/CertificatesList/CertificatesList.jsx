import React from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { create, getList, remove, update } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { connect } from 'react-redux';

import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import {
  ClassesSelect,
  SectionSelect,
  SessionSelect,
} from '../../components/Selects';
import GradientButton from 'components/Button/GradientButton';
import { getValue } from 'helpers';
import studentService from '../../../../services/student.service';
import MaterialTable from 'material-table';

class CertificatesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: null,
      sections: null,
      students: [],
    };

    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.showRecords = this.showRecords.bind(this);
    this.printCertificate = this.printCertificate.bind(this);
  }

  onChangeSelect(key) {
    const { getSectionsList } = this.props;
    return values => {
      this.setState({ [key]: values.value });

      if (values && key === 'classes') {
        getSectionsList({ class_id: values.value });
      }
    };
  }

  componentDidMount() {
    const { getClassesList, getSessionList } = this.props;

    getClassesList();
    getSessionList();
  }

  async showRecords() {
    const { classes, sections } = this.state;
    const filters = {
      class_id: classes,
      section_id: sections,
    };

    const result = await studentService.getByCustomFilters(filters);

    this.setState({ students: result.data });
  }

  printCertificate(data) {
    console.log('data', data);
    const ids = data.map(item => item.id);

    window.location.href =
      'http://192.168.0.213:8020/generate/certificates/' + ids.join(',');
  }

  render() {
    const { students } = this.state;
    const {
      sessions,
      classes,
      sections,
      sectionLoading,
      classesLoading,
      sessionLoading,
    } = this.props;

    return (
      <>
        <Card>
          <CardHeader
            title={'Wybierz kryteria'}
            subheader={'W tym miejscu będziesz mógł ułożyc plan zajęć.'}
          />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item lg={4} md={4} xl={4} xs={12}>
                <SessionSelect
                  sessions={sessions}
                  onChange={this.onChangeSelect('session')}
                  loading={sessionLoading}
                />
              </Grid>
              <Grid item lg={4} md={4} xl={4} xs={12}>
                <ClassesSelect
                  classes={classes}
                  onChange={this.onChangeSelect('classes')}
                  loading={classesLoading}
                />
              </Grid>
              <Grid item lg={4} md={4} xl={4} xs={12}>
                <SectionSelect
                  sections={sections}
                  onChange={this.onChangeSelect('sections')}
                  loading={sectionLoading}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <GradientButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.showRecords}
                >
                  Pokaż
                </GradientButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {students.length > 0 && (
          <Card style={{ marginTop: '50px' }}>
            <CardHeader title={'Dziennik obecności'} />
            <MaterialTable
              title="Basic Selection Preview"
              columns={[
                { title: 'Id', field: 'id' },
                { title: 'Imię', field: 'name' },
                { title: 'Nazwisko', field: 'lastName' },
                { title: 'Sekcja', field: 'sectionName' },
              ]}
              data={students}
              options={{
                selection: true,
              }}
              actions={[
                {
                  tooltip: 'Wygeneruj ceryfikaty',
                  icon: 'card_membership',
                  onClick: (evt, data) => this.printCertificate(data),
                },
              ]}
            />
          </Card>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { items: sectionItems = [], loading: sectionLoading } = state[
    resourceName.sections
  ];
  const { items: classesItems = [], loading: classesLoading } = state[
    resourceName.classes
  ];

  const { items: sessionItems = [], loading: sessionLoading } = state[
    resourceName.session
  ];

  return {
    sections: getValue(sectionItems, []),
    classes: getValue(classesItems, []),
    sessions: getValue(sessionItems, []),
    sectionLoading,
    classesLoading,
    sessionLoading,
  };
};

const actionCreators = {
  getClassesList: getList(resourceName.classes),
  getSectionsList: getList(resourceName.sections),
  getSessionList: getList(resourceName.session),
};

const connectedPage = withSnackbar(
  connect(mapStateToProps, actionCreators)(CertificatesList)
);

export { connectedPage as CertificatesList };
