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
import { create, getList, remove, update } from 'stores/actions';
import { resourceName } from 'stores/resources';
import { connect } from 'react-redux';
import CheckboxGroup from 'routes/AdminLayout/components/CheckboxGroup/CheckboxGroup';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddUsersToClass from './AddUsersToClass';
import { SectionSelect } from '../../../components/Selects';
import DialogContentText from '@material-ui/core/DialogContentText';
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
import searchService from '../../../../../services/search.service';

class ClassesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentClass: {},
      checkbox: [],
      open: false,
      userList: [],
    };

    this.onChange = this.onChange.bind(this);
    this.editRecordHandle = this.editRecordHandle.bind(this);
    // this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { getClassesList, getSectionList } = this.props;
    getClassesList();
    getSectionList();
  }

  onChange(values) {
    this.setState({ checkbox: { ...values } });
  }

  editRecordHandle(event, rowData) {
    this.setState({ currentClass: rowData });
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
    const { currentClass, checkbox = [], open } = this.state;

    const initialValues = currentClass.name
      ? { classes: currentClass.name }
      : { classes: null };

    const columns = [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Klasa', field: 'name' },
      {
        title: 'Sekcja',
        field: 'sections',
        render: rowData =>
          rowData.sections.map(item => {
            return <li>{item.name}</li>;
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
        searchService.search(inputValue, 'parents').then(result => {
          resolve(result);
        });
      });

    return (
      <div>
        <AddUsersToClass
          setClick={click => (this.toggleModal = click)}
          open={open}
          submit={() => {
            console.log('submiting');
          }}
        >
          {props => {
            return (
              <div>
                <Grid container spacing={4}>
                  <Grid item md={6} xs={12} style={{ minHeight: '100px' }}>
                    <SectionSelect
                      sections={currentClass.sections}
                      onChange={value => {
                        console.log('onChange', value);
                      }}
                    />
                    <AsyncSelect
                      onChange={result => props.onChange(result.value)}
                      cacheOptions
                      loadOptions={promiseOptions}
                      defaultOptions="true"
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
                  <Grid xs={12}>
                    <div>
                      <Typography
                        style={{ paddingLeft: '10px' }}
                        variant="h5"
                        component="h5"
                      >
                        Lista użytkowników
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <AccountCircleIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Single-line item" />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <AccountCircleIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Single-line item" />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
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
                    tooltip: 'Save User',
                    onClick: this.editRecordHandle,
                  },
                  {
                    icon: 'add',
                    tooltip: 'Dodaj uczniów do klasy',
                    onClick: (event, rowData) => {
                      this.editRecordHandle(event, rowData);
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
};

const connectedPage = connect(mapStateToProps, actionCreators)(ClassesList);

export { connectedPage as ClassesList };
