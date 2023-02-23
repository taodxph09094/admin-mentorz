import React, { useEffect, useState } from "react";
import BaseAdminContainer from "../../../components/BaseAdminContainer";
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
import Panels from "../../../components/Core/Panels";
import { Field, Form, Formik } from "formik";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { RouteBase } from "../../../constants/routeUrl";
import { usePostData } from "../../../hooks/services/usePostApi";
import { EDU_URL } from "../../../constants/api";
import CustomDataTable from "../../../components/Core/CustomDataTable";
import { useGetData } from "../../../hooks/services/useGetApi";
import MCreateTest from "./MCreateTest";
const TestDetails = (props) => {
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
  const styleCk = {
    margin: 5,
  };
  let index = 0;
  const columns = [
    {
      name: "STT",
      selector: (row) => index++,
      sortable: true,
    },
    {
      selector: (row) => row?.question?.content,
      name: "Câu hỏi",
      sortable: true,
    },
    {
      name: "Loại câu hỏi",
      selector: (row) => row?.type,
      sortable: true,
    },
    {
      name: "Số điểm",
      selector: (row) => row?.point,
      sortable: true,
    },
    {
      name: "Tổng câu trả lời",
      selector: (row) => row?.choices.length,
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
              // onClick={(event) => update(event, row)}
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
  const id = new URLSearchParams(props.location.search).get("id");

  const getTest = useGetData(`${EDU_URL.GET_TEST_DETAIL}/${id}`, initParams);
  useEffect(() => {
    let isCurrent = true;
    if (!!isCurrent) {
      void getTest._getData(null, paramRequest);
    }
    return () => {
      isCurrent = false;
    };
  }, [paramRequest]);

  const create = () => {
    setModalCreateOpen(!modalCreateOpen);
  };
  const formInitValue = {
    type: "",
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string(),
  });
  const reset = () => {
    setParamRequest(initParams);
  };
  const refreshPage = () => {
    setParamRequest({ ...paramRequest, page: 0 });
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
                      <Label for="fullname">Loại câu hỏi</Label>
                      <Input
                        id="type"
                        name="type"
                        tag={Field}
                        placeholder="Nhập loại câu hỏi"
                        value={values.type}
                        invalid={!!(touched.type && errors.type)}
                      />
                    </FormGroup>
                    <div className="col-sm-1" />
                    <FormGroup className="col-sm-3"></FormGroup>
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
              Danh sách câu hỏi của {getTest?.data?.name}
            </h1>
            <div className="col-sm-9 text-right">
              <Button color="primary" type="button" onClick={create}>
                Thêm câu hỏi
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <CustomDataTable
              data={getTest?.data?.questions}
              columns={columns}
              progressPending={getTest?.isLoading}
              pagination
              paginationServer
              paginationTotalRows={getTest?.data?.pagination?.totalRecords ?? 0}
              onChangeRowsPerPage={(val) => {
                setParamRequest({ ...paramRequest, size: val, page: 0 });
              }}
              onChangePage={(val) => {
                setParamRequest({ ...paramRequest, page: val - 1 });
              }}
            />
          </CardBody>
        </Card>
        <MCreateTest
          isOpen={modalCreateOpen}
          setModalOpen={setModalCreateOpen}
          refreshParent={refreshPage}
          idTest={getTest?.data?._id}
        />
        {/* <MUpdate
          isOpen={modalUpdateOpen}
          setModalOpen={setModalUpdateOpen}
          refreshParent={refreshPage}
          formValues={getUniversity.data}
        /> */}
      </Container>
    </BaseAdminContainer>
  );
};

export default TestDetails;
