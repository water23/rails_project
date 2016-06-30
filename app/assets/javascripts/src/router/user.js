import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import Search from '../components/users/search'
import UsersAction from '../actions/users'

export default class UserRouter extends BaseRouter {
  register() {
    this.route('/users/search', this.decorateSearch, this.loadUsers)
  }

  loadUsers(ctx, next) {
    UsersAction.loadUser()
    next()
  }

  decorateSearch(ctx, next) {
    (new ReactDecorator()).decorate('react-main', Search)
    next()
    // this.decorateView(Search, '#react-main')
  }
}