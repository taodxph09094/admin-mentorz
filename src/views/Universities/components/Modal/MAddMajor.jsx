import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Row,
  FormGroup,
  Input,
  CardBody,
  Modal,
  ModalBody,
  Card,
  ModalFooter,
  Label,
} from "reactstrap";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { usePostData } from "hooks/services/usePostApi";
import { alertService } from "../../../../services/alertService";
import { EDU_URL } from "../../../../constants/api";
import { usePatchData } from "../../../../hooks/services/usePatchApi";
import { CodeConstants } from "../../../../constants/ApiCode";
import CustomDataTable from "../../../../components/Core/CustomDataTable";
import Panels from "../../../../components/Core/Panels";
const MAddMajor = (props) => {
  const { isOpen, setModalOpen, refreshParent, universityId } = props;
  const initParams = {
    page: 0,
    size: 20,
  };
  const [paramRequest, setParamRequest] = useState(initParams);
  const [selectedProdIds, setSelectedProdIds] = useState([]);
  const getMajors = usePostData(null, true, null, false, false);

  //get list
  useEffect(() => {
    if (filter?.name !== "") {
      const payload = {
        filterQuery: {
          name: filter?.name,
          educationType: "UNIVERSITY",
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
          educationType: "UNIVERSITY",
        },
        options: {
          limit: 20,
          page: 1,
        },
      };
      getMajors._postData(EDU_URL.GET_MAJORS, payload).then();
    }
  }, [paramRequest]);

  ///add
  const addMajor = usePatchData(null, true, null, false, false);
  useEffect(() => {
    if (addMajor.data) {
      if (addMajor.data.status === CodeConstants.success) {
        postSuccess();
      } else {
        postFailed();
      }
    }
  }, [addMajor.data]);
  const onConfirm = async () => {
    if (selectedProdIds.length <= 0) return;
    // await addBestSellers._postData(`${BUSINESS_URL.GET_LIST_MERCHANT}/${posId}${BUSINESS_URL.POST_BEST_SELLER}`, {
    //   productIds: selectedProdIds,
    // });
    console.log(selectedProdIds);
    refreshParent();
    // setModalOpen(false);
  };
  const postSuccess = () => {
    alertService.success("TH??nh c??ng");
  };

  const postFailed = () => {
    alertService.error("Th???t b???i");
  };
  const columns = [
    {
      name: "T??n m??n",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Kh???i tr?????ng",
      selector: (row) => row.educationType,
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
      name: "Tr???ng th??i",
      sortable: true,
    },
  ];
  function onSelectedRows(selectedRows) {
    console.log(selectedRows);
    if (selectedRows?.selectedCount > 0) {
      const selectedProdIds = selectedRows.selectedRows.map((row) => row._id);
      setSelectedProdIds(selectedProdIds);
    }
  }
  const formInitValue = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
  });
  const [filter, setFilter] = useState();
  const reset = () => {
    setParamRequest(initParams);
  };
  return (
    <Modal isOpen={isOpen} size="lg">
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          Th??m chuy??n ng??nh
        </h3>
        <button
          aria-label="Close"
          className="close"
          type="button"
          onClick={() => setModalOpen(false)}
        >
          <span aria-hidden={true}>??</span>
        </button>
      </div>
      <ModalBody>
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
                      <Label for="name">T??n chuy??n ng??nh</Label>
                      <Input
                        id="name"
                        name="name"
                        tag={Field}
                        placeholder="T??m ki???m theo t??n chuy??n ng??nh"
                        value={values.name}
                        invalid={!!(touched.name && errors.name)}
                      />
                    </FormGroup>
                    <div className="col-sm-1" />
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
                          L??m m???i
                        </Button>
                        <Button color="primary" type="submit">
                          T??m ki???m
                        </Button>
                      </div>
                    </FormGroup>
                  </Row>
                </Form>
              )}
            </Formik>
          </Panels>
        </Card>
        <CardBody>
          <CustomDataTable
            data={getMajors?.data?.data?.docs}
            columns={columns}
            progressPending={getMajors?.isLoading}
            pagination
            paginationServer
            selectableRows
            onSelectedRowsChange={(rows) => onSelectedRows(rows)}
            paginationTotalRows={getMajors?.data?.pagination?.totalRecords ?? 0}
            onChangeRowsPerPage={(val) => {
              setParamRequest({ ...paramRequest, size: val, page: 0 });
            }}
            onChangePage={(val) => {
              setParamRequest({ ...paramRequest, page: val - 1 });
            }}
          />
        </CardBody>
      </ModalBody>
      <ModalFooter className="d-flex">
        <div className="ml-auto">
          <Button color="default" outline onClick={() => setModalOpen(false)}>
            H???y
          </Button>
          <Button color="primary" onClick={onConfirm}>
            OK
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default MAddMajor;
