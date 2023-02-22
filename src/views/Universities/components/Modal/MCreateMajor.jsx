import React, { useEffect } from "react";
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
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { usePostData } from "hooks/services/usePostApi";
import { alertService } from "../../../../services/alertService";
import { CodeConstants } from "../../../../constants/ApiCode";
import { EDU_URL } from "../../../../constants/api";
const MCreateMajor = (props) => {
  const { isUpdate, isOpen, setModalOpen, refreshParent, universityId } = props;
  console.log(universityId);
  const formInitValue = {
    name: "",
    educationType: "UNIVERSITY",
    educationId: universityId,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên chuyên ngành không được để trống"),
  });
  const putSuccess = (val) => {
    if (val?.status + "" === "200") {
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
    void postCreate._postData(`${EDU_URL.CREATE_MAJOR}`, values);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          Thêm chuyên ngành
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
                    Tên chuyên ngành&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="name"
                    tag={Field}
                    placeholder="Nhập tên trường đại học"
                    value={values.name}
                    invalid={!!(touched.name && errors.name)}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
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

export default MCreateMajor;
