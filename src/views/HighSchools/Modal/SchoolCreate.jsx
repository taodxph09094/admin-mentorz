import {
  Badge,
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import { alertService } from "../../../services/alertService";
import { usePostData } from "../../../hooks/services/usePostApi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { EDU_URL } from "../../../constants/api";
import { Select } from "antd";

const SchoolCreate = (props) => {
  const { isOpen, setModalOpen, refreshParent } = props;
  const [active, setActive] = useState();

  const [subject, setSubject] = useState([]);
  const [classL, setClassL] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên trường không được để trống"),
    shortName: Yup.string().required("Tên viết tắt trường không được để trống"),
    address: Yup.string().required("Địa chỉ trường không được để trống"),
    phoneNumber: Yup.string().required(
      "Số điện thoại trường không được để trống"
    ),
  });

  const putSuccess = (val) => {
    if (val?.status + "" === "201") {
      alertService.success("Thêm mới thành công");
    }
    setModalOpen(false);
    refreshParent();
  };

  const putFail = (val) => {
    alertService.error(val?.data?.message);
  };

  const postCreate = usePostData(
    null,
    true,
    null,
    false,
    false,
    putSuccess,
    putFail
  );

  const formInitValue = {
    name: "",
    shortName: "",
    address: "",
    phoneNumber: "",
    logo: "",
    class: [...classL],
    subject: [...subject],
    educationType: "HIGH SCHOOL",
  };
  const onConfirm = (values) => {
    void postCreate._postData(`${EDU_URL.CREATE_UNIVERSITY}`, values);
  };

  const getSubject = usePostData(null, true, null, false, false);
  useEffect(() => {
    const payload = {
      filterQuery: {
        educationType: "HIGH SCHOOL",
      },
    };
    getSubject._postData(EDU_URL.GET_SUBJECTS, payload).then();
  }, []);

  const sub = getSubject?.data?.data?.docs.map((data) => {
    return data;
  });

  const newArray = sub?.map((item) => {
    return {
      value: item.name,
      title: item.name,
    };
  });

  const classList = [
    { value: "Lớp 12", title: "Lớp 12" },
    { value: "Lớp 11", title: "Lớp 11" },
    { value: "Lớp 10", title: "Lớp 10" },
  ];

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          Thêm trường học
        </h3>
        <button
          aria-label="Close"
          className="close"
          type="button"
          onClick={() => setModalOpen(false)}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>
        <Formik
          initialValues={formInitValue}
          validationSchema={validationSchema}
          onSubmit={onConfirm}
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
              <Col>
                <Row>
                  <FormGroup className="col-sm-6">
                    <Label>
                      Tên trường: &nbsp;
                      <span className="text-danger">*</span>
                    </Label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Nhập tên trường"
                      tag={Field}
                      value={values.name}
                      invalid={!!(touched.name && errors.name)}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>

                  <FormGroup className="col-sm-6">
                    <Label>
                      Tên viết tắt&nbsp;
                      <span className="text-danger">*</span>
                    </Label>
                    <Input
                      name="shortName"
                      type="text"
                      tag={Field}
                      placeholder="Nhập tên viết tắt"
                      value={values.shortName}
                      invalid={!!(touched.shortName && errors.shortName)}
                    />
                    <FormFeedback>{errors.shortName}</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-sm-12">
                    <Label>
                      Địa chỉ: &nbsp;
                      <span className="text-danger">*</span>
                    </Label>
                    <Input
                      name="address"
                      type="text"
                      placeholder="Nhập địa chỉ"
                      tag={Field}
                      value={values.address}
                      invalid={!!(touched.address && errors.address)}
                    />
                    <FormFeedback>{errors.address}</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-sm-12">
                    <Label>
                      Số điện thoại: &nbsp;
                      <span className="text-danger">*</span>
                    </Label>
                    <Input
                      name="phoneNumber"
                      type="text"
                      placeholder="Nhập số điện thoại"
                      tag={Field}
                      value={values.phoneNumber}
                      invalid={!!(touched.phoneNumber && errors.phoneNumber)}
                    />
                    <FormFeedback>{errors.phoneNumber}</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-sm-12">
                    <Label>
                      Chọn môn học: &nbsp;
                      <span className="text-danger">*</span>
                    </Label>
                    <Select
                      mode="multiple"
                      allowClear
                      placeholder="Vui lòng chọn môn học"
                      onChange={(value) => setSubject(value)}
                      options={newArray}
                      style={{ width: "100%" }}
                      size="large"
                    />
                    <FormFeedback>{errors.phoneNumber}</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-sm-12">
                    <Label>
                      Chọn lớp: &nbsp;
                      <span className="text-danger">*</span>
                    </Label>
                    <Select
                      mode="multiple"
                      allowClear
                      placeholder="Vui lòng chọn danh sách lớp cho trường"
                      onChange={(value) => setClassL(value)}
                      options={classList}
                      style={{ width: "100%" }}
                      size="large"
                    />
                    <FormFeedback>{errors.phoneNumber}</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-sm-12">
                    <Label>Trạng thái:</Label>
                    <Label className="ml-2" htmlFor="status">
                      {active ? (
                        <Badge
                          style={{ cursor: "pointer" }}
                          color="success"
                          onClick={() => setActive(!active)}
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          style={{ cursor: "pointer" }}
                          color="warning"
                          onClick={() => setActive(!active)}
                        >
                          Inactive
                        </Badge>
                      )}
                    </Label>
                    <Input
                      name="status"
                      id="status"
                      accept="image/*"
                      tag={Field}
                      value={values.status}
                      hidden
                    />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="col-sm-12">
                    <Label>Logo:</Label>
                    <Input
                      name="logo"
                      type="file"
                      accept="image/*"
                      tag={Field}
                    />
                  </FormGroup>
                </Row>
              </Col>
              <Row>
                <div className="col-sm-12 text-right">
                  <Button
                    color="default"
                    outline
                    type="button"
                    onClick={() => setModalOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button color="primary" type="submit" onClick={handleSubmit}>
                    OK
                  </Button>
                </div>
              </Row>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default SchoolCreate;
