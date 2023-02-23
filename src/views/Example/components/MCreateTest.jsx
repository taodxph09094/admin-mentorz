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
const MCreateTest = (props) => {
  const { isOpen, setModalOpen, refreshParent } = props;
  //   console.log(formValue);
  const formInitValue = {
    content: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    // testId: "63edac92fc9c77ea82b22e96",
    // question: {
    //   content: "Trời hôm nay màu gì ?",
    // },
    // choices: [
    //   {
    //     answer: "Màu trắng",
    //     isCorrect: false,
    //   },
    //   {
    //     answer: "Màu đen",
    //     isCorrect: false,
    //   },
    //   {
    //     answer: "Màu hồng",
    //     isCorrect: false,
    //   },
    //   {
    //     answer: "Màu xanh da trời",
    //     isCorrect: true,
    //   },
    //   {
    //     answer: "",
    //     isCorrect: true,
    //   },
    //   {
    //     answer: "",
    //     isCorrect: true,
    //   },
    // ],
    type: "SINGLE CHOICE",
    point: "",
  };
  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Không được để trống"),
    answer1: Yup.string().required("Không được để trống"),
    answer2: Yup.string().required("Không được để trống"),
    answer3: Yup.string().required("Không được để trống"),
    answer4: Yup.string().required("Không được để trống"),
    type: Yup.string().required("Không được để trống"),
    point: Yup.string().required("Không được để trống"),
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
    const body = {
      testId: "63edac92fc9c77ea82b22e96",
      question: {
        content: values?.content,
      },
      position: 1,
      choices: [
        {
          answer: values?.answer1,
          isCorrect: false,
        },
        {
          answer: values?.answer2,
          isCorrect: false,
        },
        {
          answer: values?.answer3,
          isCorrect: false,
        },
        {
          answer: values?.answer4,
          isCorrect: true,
        },
      ],
      type: "SINGLE CHOICE",
      //   point: values?.point,
      point: parseInt(values?.point),
    };
    // content: values?.content,
    console.log(values);
    console.log(body);
    void postCreate._postData(`${EDU_URL.CREATE_TEST}`, body);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header">
        <h3 className="modal-title font-weight-bold" id="exampleModalLabel">
          Thêm câu hỏi
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
                    Nội dung câu hỏi&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="content"
                    tag={Field}
                    placeholder="Nhập tên trường đại học"
                    value={values.content}
                    invalid={!!(touched.content && errors.content)}
                  />
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Câu trả lời&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="answer1"
                    tag={Field}
                    placeholder="Nhập tên trường đại học"
                    value={values.answer1}
                    invalid={!!(touched.answer1 && errors.answer1)}
                  />
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Câu trả lời&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="answer2"
                    tag={Field}
                    placeholder="Nhập tên trường đại học"
                    value={values.answer2}
                    invalid={!!(touched.answer2 && errors.answer2)}
                  />
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Câu trả lời&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="answer3"
                    tag={Field}
                    placeholder="Nhập tên trường đại học"
                    value={values.answer3}
                    invalid={!!(touched.answer3 && errors.answer3)}
                  />
                </FormGroup>
                <FormGroup className="col-sm-12">
                  <Label>
                    Câu trả lời&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="answer4"
                    tag={Field}
                    placeholder="Nhập tên trường đại học"
                    value={values.answer4}
                    invalid={!!(touched.answer4 && errors.answer4)}
                  />
                </FormGroup>

                <FormGroup className="col-sm-12">
                  <Label>
                    Điểm&nbsp;
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="point"
                    tag={Field}
                    placeholder="Nhập tên trường đại học"
                    value={values.point}
                    invalid={!!(touched.point && errors.point)}
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

export default MCreateTest;
