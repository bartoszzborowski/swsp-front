import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { Form, Formik } from 'formik';
import MaterialTable from 'material-table';
import TextFieldCustom from 'routes/AdminLayout/components/TextFieldCustom/TextFieldCustom';
import GradientButton from 'components/Button/GradientButton';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import { getValue } from 'helpers';
import { create, getList, remove, update, userActions } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { connect } from 'react-redux';
import CheckboxGroup from 'routes/AdminLayout/components/CheckboxGroup/CheckboxGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddUsersToClass from './AddUsersToClass';
import { SectionSelect } from '../../../components/Selects';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import AsyncSelect from 'react-select/async/dist/react-select.esm';
import searchService from 'services/search.service';
import { withSnackbar } from 'notistack';
import studentService from 'services/student.service';

class ClassesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentClass: {},
      checkbox: [],
      open: false,
      userList: [],
      userListCopy: [],
      section: null,
    };

    this.onChange = this.onChange.bind(this);
    this.editRecordHandle = this.editRecordHandle.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    // this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { getClassesList, getSectionList } = this.props;
    getClassesList();
    getSectionList();
  }

  selectSectionAction(selectedSection = null) {
    if (selectedSection) {
      const { currentClass } = this.state;
      const filters = {
        section_id: selectedSection.value,
        class_id: currentClass.id,
      };

      studentService.getByCustomFilters(filters).then(
        result => {
          const { data } = result;
          const students =
            data.length > 0 &&
            data.map(item => {
              return {
                value: item.id,
                label: item.name,
              };
            });
          this.setState({ userList: students, userListCopy: students });
        },
        errors => {
          console.log('errors', errors);
        }
      );
    }
  }

  onChange(values) {
    this.setState({ checkbox: { ...values } });
  }

  editRecordHandle(event, rowData) {
    this.setState({ currentClass: rowData });
  }

  addStudent(users) {
    this.setState(
      state => ({ userList: users === null ? [] : users }),
      () => this.forceUpdate()
    );
    // users &&
    //   users.map(user => {
    //     this.setState(
    //       state => ({ userList: users }),
    //       () => this.forceUpdate()
    //     );
    //   });
  }

  deleteUser(user) {
    const { userList } = this.state;
    this.setState(
      state => ({ userList: state.userList.delete(user) }),
      () => this.forceUpdate()
    );
  }

  saveUsers() {
    const {
      userList = [],
      userListCopy = [],
      currentClass,
      section,
    } = this.state;
    const { updateStudent } = this.props;

    if (section === null) {
      this.props.enqueueSnackbar('Musisz wybrać sekcję przed zapisem.', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      return null;
    }

    getValue(userListCopy, [])
      .filter(item => !getValue(userList, []).includes(item))
      .map(user => {
        updateStudent({
          id: user.value,
          classId: { value: null, options: { check: false } },
          sectionId: { value: null, options: { check: false } },
        }).then(
          result => {
            console.log('success update');
          },
          error => {
            console.log('error update');
          }
        );
      });

    getValue(userList, []).length > 0 &&
      userList
        .filter(item => !getValue(userListCopy, []).includes(item))
        .map(user => {
          updateStudent({
            id: user.value,
            classId: currentClass.id,
            sectionId: section.value,
          }).then(
            result => {
              console.log('success update');
            },
            error => {
              console.log('error update');
            }
          );
        });
  }

  render() {
    const {
      classes,
      sections,
      isLoading,
      createClass,
      getClassesList,
      removeClass,
      updateClass,
    } = this.props;
    const { currentClass, checkbox = [], open, userList = [] } = this.state;

    const initialValues = currentClass.name
      ? { classes: currentClass.name }
      : { classes: undefined };

    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Klasa', field: 'name' },
      {
        title: 'Sekcja',
        field: 'sections',
        render: rowData =>
          rowData.sections.map((item, index) => {
            return <li key={index}>{item.name}</li>;
          }),
      },
    ];

    const sectionsCheckboxOption =
      sections &&
      sections.map(item => {
        return {
          value: item.id,
          label: item.name,
        };
      });

    const defaultSelected =
      (currentClass.hasOwnProperty('sections') &&
        currentClass.sections.map(item => item.id)) ||
      [];

    const promiseOptions = inputValue =>
      new Promise(resolve => {
        searchService.search(inputValue, 'students').then(result => {
          resolve(result);
        });
      });

    return (
      <div>
        <AddUsersToClass
          setClick={click => (this.toggleModal = click)}
          open={open}
          submit={() => {
            this.saveUsers();
            this.toggleModal();
          }}
        >
          {props => {
            return (
              <div style={{ minHeight: '200px' }}>
                <Grid container spacing={4}>
                  <Grid item md={6} xs={12}>
                    <SectionSelect
                      sections={currentClass.sections || []}
                      onChange={value => {
                        this.setState({ section: value });
                        this.selectSectionAction(value);
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <AsyncSelect
                      key={JSON.stringify(userList)}
                      isMulti
                      onChange={result => this.addStudent(result)}
                      cacheOptions
                      loadOptions={promiseOptions}
                      defaultOption
                      defaultValue={userList}
                      placeholder="Wybierz ucznia..."
                    />

                    {/*<div*/}
                    {/*  onClick={() => {*/}
                    {/*    props.toggleModal();*/}
                    {/*    this.setState({ open: false });*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  Close*/}
                    {/*</div>*/}
                  </Grid>
                  <Grid>
                    <div>
                      <Typography
                        style={{ paddingLeft: '10px' }}
                        variant="h5"
                        component="h5"
                      >
                        Lista użytkowników
                      </Typography>
                      <List>
                        {userList.length > 0 &&
                          userList.map((user, index) => {
                            return (
                              <ListItem key={index}>
                                <ListItemAvatar>
                                  <Avatar>
                                    <AccountCircleIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.label} />
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon
                                      onClick={() => this.deleteUser(user)}
                                    />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            );
                          })}
                      </List>
                    </div>
                  </Grid>
                </Grid>
              </div>
            );
          }}
        </AddUsersToClass>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <Card>
              <CardHeader title={'Dodaj klasę'} />
              <CardContent>
                <Formik
                  enableReinitialize="true"
                  initialValues={initialValues}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    const checkedCheckbox = [];
                    Object.entries(checkbox).forEach(([key, val]) => {
                      return val.checked === true
                        ? checkedCheckbox.push(val)
                        : undefined;
                    });

                    if (currentClass.hasOwnProperty('sections')) {
                      values.sections = checkedCheckbox;
                      values.id = currentClass.id;

                      updateClass(values).then(() => {
                        getClassesList();
                        setSubmitting(false);
                        resetForm();
                      });
                    } else {
                      values.sections = checkedCheckbox;
                      createClass(values).then(item => {
                        getClassesList();
                        setSubmitting(false);
                        resetForm();
                      });

                      this.setState({ currentClass: {}, checkbox: [] });
                    }
                  }}
                >
                  {props => (
                    <Form>
                      <TextFieldCustom
                        name={'classes'}
                        label={'Klasa'}
                        props={props}
                      />
                      {sectionsCheckboxOption.length === 0 && (
                        <LinearProgress />
                      )}
                      {sectionsCheckboxOption.length > 0 && (
                        <CheckboxGroup
                          name={'sections'}
                          label={'Sekcje'}
                          onChange={this.onChange}
                          defaultSelected={defaultSelected}
                          elements={sectionsCheckboxOption}
                        />
                      )}
                      <Grid spacing={3} container>
                        <Grid item xs={12}>
                          <Box
                            textAlign={'center'}
                            style={{ marginTop: '20px' }}
                          >
                            <GradientButton
                              startIcon={<DoneIcon />}
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              Zapisz
                            </GradientButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <Card>
              <MaterialTable
                title="Lista klas"
                columns={columns}
                isLoading={isLoading}
                editable={{
                  onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      removeClass(oldData.id).then(() => {
                        resolve();
                      });
                    }),
                }}
                data={classes}
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'Edytuj klasę',
                    onClick: this.editRecordHandle,
                  },
                  {
                    icon: 'add',
                    tooltip: 'Dodaj uczniów do klasy',
                    onClick: (event, rowData) => {
                      this.editRecordHandle(event, rowData);
                      this.setState({ userList: [] });
                      this.toggleModal();
                    },
                  },
                ]}
                options={{
                  actionsColumnIndex: 4,
                  exportButton: true,
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { items = [], loading } = state.classes;
  const { items: sectionItems = [], loading: sectionLoading } = state.sections;

  return {
    classes: getValue(items, []),
    sections: getValue(sectionItems, []),
    sectionLoading,
    isLoading: loading,
  };
};

const actionCreators = {
  getClassesList: getList(resourceName.classes),
  getSectionList: getList(resourceName.sections),
  createClass: create(resourceName.classes),
  updateClass: update(resourceName.classes),
  removeClass: remove(resourceName.classes),
  updateStudent: update(resourceName.student),
};

const connectedPage = withSnackbar(
  connect(mapStateToProps, actionCreators)(ClassesList)
);

export { connectedPage as ClassesList };
