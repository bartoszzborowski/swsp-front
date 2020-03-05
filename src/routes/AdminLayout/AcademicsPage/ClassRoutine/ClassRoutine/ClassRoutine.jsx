import React from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import MaterialTable from 'material-table';
import GradientButton from 'components/Button/GradientButton';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import { getValue } from 'helpers';
import { create, getList, remove, update } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { connect } from 'react-redux';
import { SelectNav } from './SelectNav';
import RadioButtonGroup from '../../../StudentInfoPage/StudentAttendance/RadioButtonGroup';

class ClassRoutine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
    };

    // this.searchAttendance = this.searchAttendance.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  componentDidMount() {
    const { getClassesList } = this.props;
    getClassesList();
  }

  onChangeSelect(values) {
    if (values.date) {
      this.setState({ date: values.date });
    }

    if (values && values.classes) {
      const { getSectionsList } = this.props;
      console.log('values', values);
      getSectionsList({ class_id: values.classes });
    }
  }

  render() {
    const { classes, sections, classLoading } = this.props;
    const show = false;

    const data = null;
    const columns = [{ title: 'Id', field: 'id', editable: 'never' }];
    return (
      <>
        <Card>
          <CardHeader
            title={'Wybierz kryteria'}
            subheader={
              "Enter your school's details. This information will appear on reports, emails and receipts."
            }
          />
          <CardContent>
            <SelectNav
              onChange={this.onChangeSelect}
              onSubmit={this.searchAttendance}
              classes={classes}
              sections={sections}
              loading={classLoading}
            />
          </CardContent>
        </Card>
        {show && (
          <>
            <Card style={{ marginTop: '50px' }}>
              <CardHeader title={'Dziennik obecności'} />
              <div className="fixedTable">
                <MaterialTable
                  options={{
                    pageSize: 50,
                  }}
                  columns={columns}
                  data={data}
                />
              </div>
            </Card>
            <Card>
              <CardContent>
                <Box textAlign={'center'} style={{ marginTop: '20px' }}>
                  <GradientButton
                    startIcon={<DoneIcon />}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={this.saveAttendance}
                  >
                    Zapisz
                  </GradientButton>
                </Box>
              </CardContent>
            </Card>
          </>
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

  return {
    sections: getValue(sectionItems, []),
    classes: getValue(classesItems, []),
    sectionLoading,
    classesLoading,
  };
};

const actionCreators = {
  getClassesList: getList(resourceName.classes),
  getSectionsList: getList(resourceName.sections),
};

const connectedPage = connect(mapStateToProps, actionCreators)(ClassRoutine);

export { connectedPage as ClassRoutine };
