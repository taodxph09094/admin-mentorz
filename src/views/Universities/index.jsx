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
import Panels from "../../components/Core/Panels";
import { Field, Form, Formik } from "formik";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { RouteBase } from "../../constants/routeUrl";
import { usePostData } from "../../hooks/services/usePostApi";
import { EDU_URL } from "../../constants/api";
import CustomDataTable from "../../components/Core/CustomDataTable";
import MCreate from "./Modal/MCreate";
import MUpdate from "./Modal/MUpdate";
import { useGetData } from "../../hooks/services/useGetApi";

const Universities = (props) => {
  const { refreshParent } = props;
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

  let index;
  const columns = [
    {
      name: "STT",
      selector: (row) => index++,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <Link to={`/admin${RouteBase.UniversityDetail}?id=${row?.id}`}>
            {row?.name}
          </Link>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Tên trường",
      sortable: true,
    },
    {
      name: "Tên viết tắt",
      selector: (row) => row?.shortName,
      sortable: true,
    },
    {
      cell: (row) => {
        if (row.status) {
          return <Badge color="success">Active</Badge>;
        } else {
          return <Badge color="warning">No - action</Badge>;
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
            <AiOutlineDelete style={styleBtn} />
          </>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      name: "Hành động",
    },
  ];

  const [paramRequest, setParamRequest] = useState(initParams);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);

  const getUniversity = useGetData(null, null, true, false, false);
  const getUniversityDetailById = (value) => {
    return getUniversity._getData(`${EDU_URL.UPDATE_UNIVERSITY}/${value.id}`);
  };
  const update = async (e, value) => {
    await getUniversityDetailById(value);
    setModalUpdateOpen(!modalUpdateOpen);
  };
  const refreshPage = () => {
    setParamRequest({ ...paramRequest, page: 0 });
  };
  const getUniversities = usePostData(null, true, null, false, false);

  // console.log(getUniversities?.data?.data?.docs);
  useEffect(() => {
    const payload = {
      filterQuery: {
        educationType: "UNIVERSITY",
      },
      options: {
        limit: 10,
        page: 1,
      },
    };
    getUniversities._postData(EDU_URL.GET_UNIVERSITIES, payload).then();
  }, [paramRequest]);

  const create = () => {
    setModalCreateOpen(!modalCreateOpen);
  };

  const formInitValue = {
    name: "",
    shortName: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    shortName: Yup.string(),
  });
  const reset = () => {
    setParamRequest(initParams);
  };
  return (
    <BaseAdminContainer>
      <Container className="mt-3" fluid>
        <Card className="bg-secondary shadow border-0">
          <Panels>
            <Formik
              initialValues={formInitValue}
              validationSchema={validationSchema}
              onSubmit={(values) => {
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
                      <Label for="fullname">Tên trường</Label>
                      <Input
                        id="name"
                        name="name"
                        tag={Field}
                        placeholder="Nhập tên trường"
                        value={values.name}
                        invalid={!!(touched.name && errors.name)}
                      />
                    </FormGroup>
                    <div className="col-sm-1" />
                    <FormGroup className="col-sm-3">
                      <Label for="shortName">Tên viết tắt:</Label>
                      <Input
                        id="shortName"
                        name="shortName"
                        tag={Field}
                        placeholder="nhập tên viết tắt"
                        value={values.shortName}
                        invalid={!!(touched.shortName && errors.shortName)}
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
            <h1 className="font-weight-bold col-sm-3">
              Danh sách trường đại học
            </h1>
            <div className="col-sm-9 text-right">
              <Button color="primary" type="button" onClick={create}>
                Thêm trường
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <CustomDataTable
              data={getUniversities?.data?.data?.docs}
              columns={columns}
              progressPending={getUniversities?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={
                getUniversities?.data?.pagination?.totalRecords ?? 0
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
          formValues={getUniversity.data}
        />
      </Container>
    </BaseAdminContainer>
  );
};

export default Universities;
