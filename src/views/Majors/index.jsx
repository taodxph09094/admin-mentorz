import React, { useEffect, useState } from "react";
import BaseAdminContainer from "../../components/BaseAdminContainer";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { RouteBase } from "../../constants/routeUrl";
import { Field, Form, Formik } from "formik";
import { usePostData } from "../../hooks/services/usePostApi";
import { EDU_URL } from "../../constants/api";
import CustomDataTable from "../../components/Core/CustomDataTable";
import Panels from "../../components/Core/Panels";
import SelectboxField from "../../components/CustomField/SelectboxField";
import MCreate from "./Modal/MCreate";
import MUpdate from "./Modal/MUpdate";
import { useGetData } from "../../hooks/services/useGetApi";
import { useDeleteData } from "../../hooks/services/useDeleteApi";
import { alertService } from "../../services/alertService";
const Majors = () => {
  const initParams = {
    page: 0,
    size: 20,
  };
  const styleBtn = {
    color: "#5e72e4",
    cursor: "pointer",
    fontSize: 18,
    margin: 5,
  };
  const styleBtnDelete = {
    color: "#F9004f",
    cursor: "pointer",
    fontSize: 18,
    margin: 5,
  };
  let index;
  const columns = [
    {
      name: "STT",
      width: "8%",
      selector: (row) => index++,
      sortable: true,
    },
    {
      selector: (row) => row?.name,
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Tên chuyên ngành",
      sortable: true,
      width: "22%",
    },
    {
      name: "Khối",
      selector: (row) => row?.educationType,
      sortable: true,
    },
    {
      cell: (row) => {
        if (row.status) {
          return <Badge color="success">Active</Badge>;
        } else {
          return <Badge color="warning">Block</Badge>;
        }
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Trạng thái",
      sortable: true,
    },

    {
      cell: (row) => {
        return (
          <>
            <AiOutlineEdit
              style={styleBtn}
              onClick={(event) => update(event, row)}
            />
            <AiOutlineDelete
              style={styleBtnDelete}
              onClick={(event) => deleteM(event, row)}
            />
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Hành động",
    },
  ];
  const [paramRequest, setParamRequest] = useState(initParams);
  const refreshPage = () => {
    setParamRequest({ ...paramRequest, page: 0 });
  };
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

  //get major detail
  const getMajor = useGetData(null, null, true, false, false);
  const getMajorById = (value) => {
    return getMajor._getData(`${EDU_URL.GET_MAJOR_DETAIL}/${value._id}`);
  };
  const update = async (e, value) => {
    await getMajorById(value);
    setModalUpdateOpen(!modalUpdateOpen);
  };

  //delete major
  const putSuccess = (val) => {
    if (val?.status + "" === "201") {
      alertService.success("Thêm mới thành công");
    }
    refreshPage();
  };

  const putFail = (val) => {
    alertService.error(val?.data?.message);
  };
  const deleteMajor = useDeleteData(
    null,
    true,
    null,
    false,
    false,
    putSuccess,
    putFail
  );
  const deleteMajorById = (value) => {
    return deleteMajor._deleteData(`${EDU_URL.GET_MAJOR_DETAIL}/${value._id}`);
  };
  const deleteM = async (e, value) => {
    await deleteMajorById(value);
    refreshPage();
  };

  const create = () => {
    setModalCreateOpen(!modalCreateOpen);
  };

  const getMajors = usePostData(null, true, null, false, false);
  useEffect(() => {
    if (filter?.type === "" && filter?.name === "") {
      const payload = {
        filterQuery: {},
        options: {
          limit: 20,
          page: 1,
        },
      };
      getMajors._postData(EDU_URL.GET_MAJORS, payload).then();
    } else if (filter?.type !== "" && filter?.name === "") {
      if (filter?.type === "TẤT CẢ") {
        const payload = {
          filterQuery: {},
          options: {
            limit: 20,
            page: 1,
          },
        };
        getMajors._postData(EDU_URL.GET_MAJORS, payload).then();
      } else {
        const payload = {
          filterQuery: {
            educationType: filter?.type,
          },
          options: {
            limit: 20,
            page: 1,
          },
        };
        getMajors._postData(EDU_URL.GET_MAJORS, payload).then();
      }
    } else if (filter?.type === "" && filter?.name !== "") {
      const payload = {
        filterQuery: {
          name: filter?.name,
        },
        options: {
          limit: 20,
          page: 1,
        },
      };
      getMajors._postData(EDU_URL.GET_MAJORS, payload).then();
    } else if (filter?.type !== "" && filter?.name !== "") {
      if (filter?.type === "TẤT CẢ" && filter?.name !== "") {
        const payload = {
          filterQuery: {
            name: filter?.name,
          },
          options: {
            limit: 20,
            page: 1,
          },
        };
        getMajors._postData(EDU_URL.GET_MAJORS, payload).then();
      } else {
        const payload = {
          filterQuery: {
            educationType: filter?.type,
            name: filter?.name,
          },
          options: {
            limit: 20,
            page: 1,
          },
        };
        getMajors._postData(EDU_URL.GET_MAJORS, payload).then();
      }
    } else {
      const payload = {
        filterQuery: {},
        options: {
          limit: 20,
          page: 1,
        },
      };
      getMajors._postData(EDU_URL.GET_MAJORS, payload).then();
    }
  }, [paramRequest]);

  const formInitValue = {
    name: "",
    type: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
  });
  const types = [
    { id: "TẤT CẢ", text: "TẤT CẢ" },
    { id: "HIGH SCHOOL", text: "HIGH SCHOOL" },
    { id: "UNIVERSITY", text: "UNIVERSITY" },
  ];
  const [filter, setFilter] = useState();
  const reset = () => {
    setParamRequest(initParams);
  };
  return (
    <>
      <BaseAdminContainer>
        <Container className="mt-3" fluid>
          <Card className="bg-secondary shadow border-0">
            <Panels>
              <Formik
                initialValues={formInitValue}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  setFilter(values);
                  setParamRequest({ ...paramRequest, ...values, page: 0 });
                }}
              >
                {({
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <Form>
                    <Row>
                      <FormGroup className="col-sm-3">
                        <Label for="name">Tên chuyên ngành</Label>
                        <Input
                          id="name"
                          name="name"
                          tag={Field}
                          placeholder="Tìm kiếm theo tên chuyên ngành"
                          value={values.name}
                          invalid={!!(touched.name && errors.name)}
                        />
                      </FormGroup>
                      <div className="col-sm-1" />
                      <FormGroup className="col-sm-3">
                        <Label for="shortName">Tìm theo khối trường</Label>
                        <Field
                          name="type"
                          placeholder="Chọn"
                          data={types}
                          component={SelectboxField}
                        />
                      </FormGroup>
                      <div className="col-sm-1" />
                      <FormGroup className="col-sm-4 text-right">
                        <Label>&nbsp;</Label>
                        <div>
                          <Button
                            color="default"
                            outline
                            type="reset"
                            onClick={reset}
                          >
                            Làm mới
                          </Button>
                          <Button color="primary" type="submit">
                            Tìm kiếm
                          </Button>
                        </div>
                      </FormGroup>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Panels>
          </Card>
          <Card className="bg-secondary shadow border-0 mt-4">
            <CardHeader className="row panel-card-header-custom">
              <h2 className="font-weight-bold col-sm-3">
                Danh sách chuyên ngành
              </h2>
              <div className="col-sm-9 text-right">
                <Button color="primary" type="button" onClick={create}>
                  Thêm chuyên ngành mới
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <CustomDataTable
                data={getMajors?.data?.data?.docs}
                columns={columns}
                progressPending={getMajors?.isLoading}
                pagination
                paginationServer
                paginationTotalRows={
                  getMajors?.data?.pagination?.totalRecords ?? 0
                }
                onChangeRowsPerPage={(val) => {
                  setParamRequest({ ...paramRequest, size: val, page: 0 });
                }}
                onChangePage={(val) => {
                  setParamRequest({ ...paramRequest, page: val - 1 });
                }}
              />
            </CardBody>
          </Card>
          <MCreate
            isOpen={modalCreateOpen}
            setModalOpen={setModalCreateOpen}
            refreshParent={refreshPage}
          />
          <MUpdate
            isOpen={modalUpdateOpen}
            setModalOpen={setModalUpdateOpen}
            refreshParent={refreshPage}
            formValues={getMajor.data}
          />
        </Container>
      </BaseAdminContainer>
    </>
  );
};

export default Majors;
