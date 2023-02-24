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
import React, { useState } from "react";
import { alertService } from "../../../services/alertService";
import { usePostData } from "../../../hooks/services/usePostApi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { EDU_URL } from "../../../constants/api";
import SelectboxField from "../../../components/CustomField/SelectboxField";
const MCreate = (props) => {
  const { isOpen, setModalOpen, refreshParent } = props;
  const formInitValue = {
    name: "",
    educationType: "",
  };
  const types = [
    { id: "HIGH SCHOOL", text: "HIGH SCHOOL" },
    { id: "UNIVERSITY", text: "UNIVERSITY" },
  ];
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Không được để trống"),
    educationType: Yup.string().required(
      "Bạn cần chọn khối trường để tiếp tục"
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
  const onConfirm = (values) => {
    void postCreate._postData(`${EDU_URL.CREATE_SUBJECT}`, values);
  };
  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          Thêm môn học
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
                    Tên môn học&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="name"
                    tag={Field}
                    placeholder="Nhập tên môn học"
                    value={values.name}
                    invalid={!!(touched.name && errors.name)}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Chọn khối trường&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Field
                    name="educationType"
                    placeholder="Chọn khối"
                    data={types}
                    component={SelectboxField}
                  />
                </FormGroup>
              </Row>
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
                  <Button color="primary" type="submit">
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

export default MCreate;
