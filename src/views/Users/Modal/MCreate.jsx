import {
  Button,
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
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import SelectboxField from "../../../components/CustomField/SelectboxField";
import { usePostData } from "../../../hooks/services/usePostApi";
import { AUTH_URL, EDU_URL } from "../../../constants/api";
import { usePostData as usePostDataAuth } from "../../../hooks/authServices/usePostApi";
import { convertToFormSelect } from "../../../helpers";
const MCreate = (props) => {
  const { isOpen, setModalOpen, refreshParent } = props;
  const types = [
    { id: "HIGH SCHOOL", text: "HIGH SCHOOL" },
    { id: "UNIVERSITY", text: "UNIVERSITY" },
  ];
  const [type, setType] = useState("");
  const [mentor, setMentor] = useState("");
  const formInitValue = {
    fullName: "",
    email: "",
    password: "",
    educationType: "",
    phoneNumber: "",
    educationId: "",
    isMentor: false,
  };
  const getUniversities = usePostData(null, true, null, false, false);
  useEffect(() => {
    // setIndex(index + 1);
    const payload = {
      filterQuery: {},
      options: {
        limit: 10,
        page: 1,
      },
    };
    getUniversities._postData(EDU_URL.GET_UNIVERSITIES, payload).then();
  }, []);
  const mentors = [
    { id: true, text: "Mentor" },
    { id: false, text: "Không" },
  ];
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Không được để trống"),
    isMentor: Yup.bool(),
    password: Yup.string().required("Không được để trống"),
    educationType: Yup.string().required("Không được để trống"),
    phoneNumber: Yup.string().required("Không được để trống"),
    educationId: Yup.string().required("Không được để trống"),
    email: Yup.string().required("Không được để trống"),
  });
  const putSuccess = (val) => {
    if (val?.status + "" === "201") {
      alertService.success("Tạo thành công");
    }
    setModalOpen(false);
    refreshParent();
  };
  const putFail = (val) => {
    alertService.error(val?.data?.message);
  };
  const postCreate = usePostDataAuth(
    null,
    true,
    null,
    false,
    false,
    putSuccess,
    putFail
  );
  const onConfirm = (values) => {
    void postCreate._postData(`${AUTH_URL.CREATE_USER}`, values);
  };
  const renderTypeAndSchool = () => {
    if (type === types[1].id) {
      return (
        <>
          <FormGroup className="col-sm-12">
            <Label>
              Trường&nbsp;
              <span className="text-danger">*</span>
            </Label>
            <Field
              name="merchantId"
              placeholder="Vui lòng chọn"
              data={convertToFormSelect(
                getUniversities?.data?.docs ?? [],
                "name",
                "id",
                false
              )}
              component={SelectboxField}
            />
          </FormGroup>
          <FormGroup className="col-sm-12">
            <Label>
              Học vấn&nbsp;
              <span className="text-danger">*</span>
            </Label>
            <Field
              name="merchantOwner"
              placeholder="Chọn"
              data={mentor}
              component={SelectboxField}
            />
          </FormGroup>
        </>
      );
    }
  };
  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          Tạo tài khoản
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
              <Row>
                <FormGroup className="col-sm-12">
                  <Label>
                    Email&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="email"
                    tag={Field}
                    placeholder="Nhập email"
                    value={values.email}
                    invalid={!!(touched.email && errors.email)}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Password&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="password"
                    type="password"
                    tag={Field}
                    placeholder="Nhập password"
                    value={values.password}
                    invalid={!!(touched.password && errors.password)}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Họ tên&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="fullName"
                    tag={Field}
                    placeholder="Nhập họ tên"
                    value={values.fullName}
                    invalid={!!(touched.fullName && errors.fullName)}
                  />
                  <FormFeedback>{errors.fullName}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Số điện thoại&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="phoneNumber"
                    tag={Field}
                    placeholder="Nhập số điện thoại"
                    value={values.phoneNumber}
                    invalid={!!(touched.phoneNumber && errors.phoneNumber)}
                  />
                  <FormFeedback>{errors.phoneNumber}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Trường&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Field
                    name="educationId"
                    placeholder="Chọn"
                    data={convertToFormSelect(
                      getUniversities?.data?.data?.docs ?? [],
                      "name",
                      "id",
                      false
                    )}
                    // data={types}
                    component={SelectboxField}
                  />
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Học vấn&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Field
                    name="type"
                    placeholder="Chọn"
                    data={types}
                    component={SelectboxField}
                  />
                  {/*{changeType(values.type)}*/}
                </FormGroup>
                {/* {renderTypeAndSchool()} */}
              </Row>
              <Row>
                <div className="col-sm-12 text-right">
                  <Button
                    color="default"
                    outline
                    type="button"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Ok
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

export default MCreate;
