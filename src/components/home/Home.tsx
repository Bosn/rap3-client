import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { push } from '../../family'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { Spin } from '../utils'
import OwnedRepositoriesCard from './OwnedRepositoriesCard'
import JoinedRepositoriesCard from './JoinedRepositoriesCard'
import LogsCard from './LogsCard'
import './Home.sass'
import { RootState } from 'actions/types'
import Button from '@mui/material/Button'
import RepositoryForm from 'components/repository/RepositoryForm'

const Maiden = () => {
  const [creating, setCreating] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  return (
    <div className="Maiden">
      <Button
        className="RepositoryCreateButton"
        variant="contained"
        color="primary"
        onClick={() => {
          setCreating(true)
        }}
      >
        {t('Create Repository')}
      </Button>
      <RepositoryForm
        title={t('Create Repository')}
        open={creating}
        onClose={(ok: boolean) => {
          if (ok) {
            dispatch(push('/repository/joined'))
          }
        }}
      />
    </div>
  )
}

// 展示组件
const Home = ({ owned, joined, logs }: any) => {
  if (owned.fetching || joined.fetching || logs.fetching) {
    return <Spin />
  }

  if (!owned.data.length && !joined.data.length) {
    return (
      <div className="Home">
        <Maiden />
      </div>
    )
  }
  return (
    <div className="Home">
      <div className="row">
        <div className="distribute-2-3 pl15 pr15">
          <LogsCard logs={logs} />
        </div>
        <div className="distribute-1-3 pl15 pr15">
          <OwnedRepositoriesCard repositories={owned} />
          <div style={{ marginTop: 8 }}>
            <JoinedRepositoriesCard repositories={joined} />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  owned: state.ownedRepositories,
  joined: state.joinedRepositories,
  logs: state.logs,
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
