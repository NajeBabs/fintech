using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FintechApi.Migrations
{
    /// <inheritdoc />
    public partial class AddAccountFormAndProviderNameToUserAccountsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccountForm",
                table: "UserAccounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProviderName",
                table: "UserAccounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountForm",
                table: "UserAccounts");

            migrationBuilder.DropColumn(
                name: "ProviderName",
                table: "UserAccounts");
        }
    }
}
