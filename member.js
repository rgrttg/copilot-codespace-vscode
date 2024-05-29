function skillsMember() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'skills-member.html',
    controller: function($scope) {
      $scope.skills = ['HTML', 'CSS', 'JS'];
      $scope.addSkill = function() {
        var skill = prompt('What skill do you want to add?');
        if (skill) {
          $scope.skills.push(skill);
        }
      };
      $scope.removeSkill = function(index) {
        $scope.skills.splice(index, 1);
      };
    }
  };
}