import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/InputFIeld/InputField';
import { ICreateTeamValues } from '../../shared/Interfaces';
import { useCreateTeamMutation, useMeQuery } from '../../generated/graphql';
import './CreateTeam.scss';

export const CreateTeam: React.FC = () => {
  const navigate = useNavigate();
  const [{ data: meQuery, fetching: meLoading }] = useMeQuery();
  const [, createTeam] = useCreateTeamMutation();

  const initialValues: ICreateTeamValues = {
    name: '',
    owner: 0,
    user_id: 0,
    creatorId: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Team name is required.'),
  });
  return (
    <div className="create-team-container">
      <h1>Create a new team</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          if (!meLoading && meQuery?.me) {
            const response = await createTeam({
              options: {
                name: values.name,
                owner: meQuery?.me?.id,
                user_id: meQuery?.me?.id,
                creatorId: meQuery?.me?.id,
              },
            });

            if (response.data?.create_team.team?.id) {
              navigate('/dashboard');
            }
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors }) => {
          return (
            <Form>
              <div className="form-row">
                <InputField name="name" placeholder="Enter a team name" fieldErrors={errors} />
              </div>
              <div className="form-row">
                <button type="submit" className="button">
                  Save Team
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
