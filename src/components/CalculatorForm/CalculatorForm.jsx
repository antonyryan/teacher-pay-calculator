import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import * as yup from "yup"

const transformToNull = (val) => isNaN(val) ? null : val
const transformToUndefined = (val) => isNaN(val) ? undefined : val
const schema = yup.object({
  rateName: yup
    .string()
    .min(3, 'This field must contain at least 3 characters'),
  baseRate: yup
    .number('This field must be a positive number')
    .positive('This field must be a positive number')
    .integer('This field must be a positive number')
    .transform(transformToUndefined)
    .required('This field must be a positive number'),
  bonusRate: yup
    .number('Bonus Rate must be a positive number')
    .positive('Bonus Rate must be a positive number')
    .integer('Bonus Rate must be a positive number')
    .transform(transformToNull)
    .nullable(true),
  minClients: yup
    .number('Min clients must be a positive number')
    .positive('Min clients must be a positive number')
    .integer('Min clients must be a positive number')
    .transform(transformToNull)
    .nullable(true),
  maxClients: yup
    .number('Max clients must be a positive number')
    .positive('Max clients must be a positive number')
    .integer('Max clients must be a positive number')
    .transform(transformToNull)
    .nullable(true)
    .test('maxClients', 'Max clients must be greater than min clients', function(val) {
      return val === null || this.parent.minClients < val
    })
}).required()

const CalculationForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)})
  const submitHandler = handleSubmit((data, event) => {
    event.preventDefault()
    event.stopPropagation()
    onSubmit(data)
  })

  return (
    <Form className="mt-5" onSubmit={submitHandler} aria-label="form">
      <Row>
        <Col md={5}>
          <FormGroup className="mb-3" controlId="rateName">
            <FormLabel>Pay Rate Name</FormLabel>
            <FormControl type="text" {...register("rateName")} isInvalid={Boolean(errors.rateName)} />
            <FormControl.Feedback type="invalid">{errors.rateName?.message}</FormControl.Feedback>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <FormGroup className="mb-3" controlId="baseRate">
            <FormLabel>Base Pay Rate per Client</FormLabel>
            <FormControl type="number" {...register("baseRate")} isInvalid={Boolean(errors.baseRate)} />
            <FormControl.Feedback type="invalid">{errors.baseRate?.message}</FormControl.Feedback>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup className="mb-3" controlId="addtionalValues">
        <span>Pay staff a bonus of</span>&nbsp;&nbsp;
        <FormControl
          style={{ display: "inline-block", width: "10%"}}
          type="number"
          {...register("bonusRate")}
          data-testid='bonusRate'
        />
        &nbsp;&nbsp;
        <span>per client for each client between</span>&nbsp;&nbsp;
        <FormControl
          style={{ display: "inline-block", width: "10%"}}
          type="number"
          {...register("minClients")}
          data-testid='minClients'
        />
        &nbsp;&nbsp;
        <span>and</span>
        &nbsp;&nbsp;
        <FormControl
          style={{ display: "inline-block", width: "10%"}}
          type="number"
          {...register("maxClients")}
          data-testid='maxClients'
        />
        {errors.bonusRate?.message && (
          <FormControl.Feedback type="invalid" className="d-block">
            {errors.bonusRate.message}
          </FormControl.Feedback>
        )}
        {errors.minClients?.message && (
          <FormControl.Feedback type="invalid" className="d-block">
            {errors.minClients.message}
          </FormControl.Feedback>
        )}
        {errors.maxClients?.message && (
          <FormControl.Feedback type="invalid" className="d-block">
            {errors.maxClients.message}
          </FormControl.Feedback>
        )}
      </FormGroup>
      <Button variant="primary" type="submit" data-testid='calculate'>
        Calculate
      </Button>
    </Form>
  )
}

CalculationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default CalculationForm
