require('dotenv').config();

var URL = 'https://api.bugsnag.com';
var PROJECT_ID = process.env.BUGSNAG_PROJECT_ID;
var auth = {
  'X-Version': 2,
  'Authorization': 'token ' + process.env.BUGSNAG_API_KEY
};

module.exports = {
  errorsOptions: {
    uri: URL + '/projects/' + PROJECT_ID + '/errors',
    headers: auth,
    json: true,
    qs: {}
  },

  eventsOptions: {
    uri: URL + '/projects/' + PROJECT_ID + '/events',
    headers: auth,
    json: true,
    qs: {}
  },

  errorsOutput: [
    {
      'id': '518031bcd775355c48a1cd4e',
      'events': 456,
      'users': 123,
      'first_seen': '2013-04-30T21:03:56Z',
      'last_seen': '2013-04-30T21:03:56Z',
      'status': 'snoozed',
      'snooze_conditions': {
        'dimension': 'time',
        'target': '2013-04-30T21:03:56Z',
        'input': 21600
      },
      'assigned_user': {
        'id': '518031bcd775355c48a1cd4e',
        'name': 'TODO'
      },
      'linked_issue': {
        'id': 123,
        'url': 'http://google.com',
        'system': 'GitHub Issues'
      },
      'trend': [
        ['2015-05-27T00:00:00.000Z', 123],
        ['2015-05-27T00:00:00.000Z', 456]
      ],
      'latest_event': {
        'id': '551c5888093024ce168bdfca',
        'error_class': 'Moped::Errors::QueryFailure',
        'message': 'Something bad happened',
        'context': 'api/accounts#index',
        'release_stage': 'production',
        'severity': 'error'
      }
    }
  ],

  eventsOutput: [
    {
      'id': '51f5d152f002c6686d013a22',
      'exceptions': [
        {
          'class': 'ActionView::Template::Error',
          'message': 'source sequence is illegal/malformed utf-8',
          'stacktrace': [
            {
              'line': 285,
              'column': 20,
              'file': 'app/models/user.rb',
              'method': 'generate'
            }
          ]
        }
      ],
      'user_id': 'user@yoursite.com',
      'received_at': '2012-12-02T05:54:25Z',
      'severity': 'error',
      'context': 'events#show',
      'app_version': '1.0.1',
      'os_version': 'Windows Vista',
      'meta_data': {},
      'url': 'https://api.bugsnag.com/events/51f5d152f002c6686d013a22',
      'html_url': 'https://bugsnag.com/errors/51f5cbadcf4cfd7373c8cc2d/events/51f5d152f002c6686d013a22'
    }
  ]
};
