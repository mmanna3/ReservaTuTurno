using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class AgregaIdAServiciosDelProfesional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiciosDelProfesional",
                table: "ServiciosDelProfesional");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ServiciosDelProfesional",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiciosDelProfesional",
                table: "ServiciosDelProfesional",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ServiciosDelProfesional_ProfesionalId_ServicioId",
                table: "ServiciosDelProfesional",
                columns: new[] { "ProfesionalId", "ServicioId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ServiciosDelProfesional",
                table: "ServiciosDelProfesional");

            migrationBuilder.DropIndex(
                name: "IX_ServiciosDelProfesional_ProfesionalId_ServicioId",
                table: "ServiciosDelProfesional");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ServiciosDelProfesional");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServiciosDelProfesional",
                table: "ServiciosDelProfesional",
                columns: new[] { "ProfesionalId", "ServicioId" });
        }
    }
}
